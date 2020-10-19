import React, { FC, useRef, useState } from 'react';
import { Stage, Layer, Rect, Group, Text } from 'react-konva';
import { Button, Divider, Card, Col, Row, Space } from 'antd';
import {
  AnyLayer,
  nodeToGroup,
  Rectangle,
  Text as TextModel,
} from 'html2sketch';
import Konva from 'konva';
import ReactJson from 'react-json-view';
import copy from 'copy-to-clipboard';

const ButtonCanvas: FC = () => {
  const ref = useRef(null);
  const [model, setModel] = useState<AnyLayer | undefined>(undefined);
  const [showJSON, setShowJSON] = useState(false);

  const renderModelToCanvas = (layer: AnyLayer, index?: number) => {
    const defaultProps: Konva.NodeConfig = {
      x: layer.x,
      y: layer.y,
      width: layer.width,
      height: layer.height,
      key: index,
    };
    switch (layer.class) {
      case 'group':
        return (
          <Group
            {...defaultProps}
            draggable
            onDragEnd={(evt) => {
              console.log(evt);
            }}
          >
            {
              // @ts-ignore
              layer.layers.map(renderModelToCanvas)
            }
          </Group>
        );
      case 'rectangle':
        const { style } = layer as Rectangle;
        const shadow = style.shadows?.[0];
        const fill = style.fills?.[0];
        const border = style.borders?.[0];

        return (
          <Rect
            {...defaultProps}
            cornerRadius={(layer as Rectangle).toKonvaRadius()}
            fill={fill.color.hex}
            strokeEnabled={style.borders.length > 0}
            strokeWidth={border.thickness}
            stroke={border.color.rgba}
            shadowBlur={shadow.blurRadius}
            shadowColor={shadow.color.rgba}
            shadowOffsetX={shadow.offsetX}
            shadowOffsetY={shadow.offsetY}
            shadowEnabled={style.shadows.length > 0}
          />
        );

      case 'text':
        const { textStyle } = layer as TextModel;

        return (
          <Text
            {...defaultProps}
            onDragMove={(e) => {
              console.log(e);
            }}
            fill={textStyle.color.rgba}
            lineHeight={textStyle.lineHeight! / textStyle.fontSize || undefined}
            fontSize={textStyle.fontSize}
            fontFamily={textStyle.fontFamily}
            verticalAlign={'middle'}
            text={(layer as TextModel).text}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div>
      <div ref={ref}>
        <Button type={'primary'}>按钮1</Button>
        <Button danger>按钮2</Button>
      </div>
      <Divider />

      <Row justify="space-between">
        <Col>
          <Button
            type={'primary'}
            onClick={async () => {
              const group = await nodeToGroup(ref.current!);
              group.x = 4;
              group.y = 4;
              // @ts-ignore
              setModel(group);
            }}
          >
            在 Konva 中显示
          </Button>
        </Col>
        <Col>
          <Space>
            <Button
              disabled={!model}
              onClick={() => {
                setShowJSON(!showJSON);
              }}
            >
              {showJSON ? '隐藏' : '显示'} JSON
            </Button>
            <Button
              onClick={() => {
                const json = model?.toSketchJSON();
                if (json) {
                  copy(JSON.stringify(json));
                }
              }}
            >
              复制 Sketch JSON
            </Button>
          </Space>
        </Col>
      </Row>

      <Divider />
      <Stage style={{ border: '1px solid #efefef' }} width={1000} height={300}>
        <Layer x={0} y={0}>
          <Group>{model ? renderModelToCanvas(model!) : null}</Group>
        </Layer>
      </Stage>
      {showJSON ? (
        <Col span={24}>
          <Card>
            <ReactJson name="Sketch JSON" src={model?.toSketchJSON() || {}} />
          </Card>
        </Col>
      ) : null}
    </div>
  );
};

export default ButtonCanvas;
