import React, { FC } from 'react';
import { Switch, Space } from 'antd';

/**
 *
 */
const SwitchDemo: FC = () => {
  return (
    <>
      <div>
        <Space>
          <Switch
            className="switch"
            symbolName="11.Switch开关/1.Default默认/1.Off关"
          />
          <Switch
            className="switch"
            disabled
            symbolName="11.Switch开关/1.Default默认/1.Off关-Disabled禁用"
          />
          <Switch
            className="switch"
            defaultChecked
            symbolName="11.Switch开关/1.Default默认/2.On开"
          />
          <Switch
            className="switch"
            defaultChecked
            disabled
            symbolName="11.Switch开关/1.Default默认/2.On开-Disabled禁用"
          />
          <Switch
            className="switch"
            size="small"
            symbolName="11.Switch开关/2.Small小/1.Off关"
          />
          <Switch
            className="switch"
            defaultChecked
            size="small"
            symbolName="11.Switch开关/2.Small小/2.On开"
          />
        </Space>
      </div>
      <div>
        <Space>
          <Switch
            className="switch"
            checkedChildren="开启"
            unCheckedChildren="关闭"
            symbolName="11.Switch开关/1.Default默认/1.Off关-带文字"
          />
          <Switch
            className="switch"
            checkedChildren="开启"
            unCheckedChildren="关闭"
            defaultChecked
            symbolName="11.Switch开关/1.Default默认/2.On开-带文字"
          />
        </Space>
      </div>
    </>
  );
};

export default SwitchDemo;