import { Form, Input, Modal } from 'antd';
import React from 'react';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

type Props = {
  visible: boolean,
  onOk: (arg: any) => any,
  onCancel: (arg: any) => any,
}

const AddThemeDialog: React.FC<Props> = (props) => {
  let formData = {}

  function handleChange(fields: any, allFields: any) {
    formData = allFields
  }

  return (
    <Modal
      title="新增模板主题"
      visible={props.visible}
      onOk={() => props.onOk(formData)}
      onCancel={props.onCancel}>
      <Form
        onValuesChange={handleChange}
        {...layout}
      >
        <Form.Item label='主题名' name='name'>
          <Input></Input>
        </Form.Item>

        <Form.Item label='封面url' name='coverUrl' >
          <Input></Input>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddThemeDialog;