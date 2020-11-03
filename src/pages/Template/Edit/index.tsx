import { Button, Card, Input, Form, InputNumber, Col, Row } from 'antd';
import { connect, Dispatch } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './style.less';
import TemplateImage from './components/TemplateImage';

const FormItem = Form.Item;
const { TextArea } = Input;

interface EditProps {
  loading: boolean;
  dispatch: Dispatch<any>;
}

const Edit: FC<EditProps & any> = (props) => {
  const { loading, templateAndEdit } = props;
  const [form] = Form.useForm();
  const [id, setId] = useState('')
  const [template, setTemplate] = useState({ ...templateAndEdit.template })

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 3 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 26 },
      md: { span: 12 },
    },
  };

  const submitFormLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 10, offset: 7 },
    },
  };

  const onFinish = (values: { [key: string]: any }) => {
    const { dispatch } = props;
    if (id) {
      //修改
      dispatch({
        type: 'templateAndEdit/update',
        payload: [id, values],
      });
    } else {
      //新建
      dispatch({
        type: 'templateAndEdit/create',
        payload: values,
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = () => {
    setTemplate({ ...template, ...form.getFieldsValue() })
  };

  useEffect(() => {
    const { location: { query: { id } } } = props
    setId(id)
    if (id) loadData(id)
  }, []);

  async function loadData(id: string) {
    const { dispatch } = props;
    const data = await dispatch({
      type: 'templateAndEdit/fetch',
      payload: id,
    });
    setTemplate(data)
    form.setFieldsValue(data)
  }

  return (
    <PageContainer content={id ? '编辑模板信息' : '新建模板，没什么好说的！'}>
      <Card bordered={false}>
        <Form
          hideRequiredMark
          layout="vertical"
          style={{ marginTop: 8 }}
          form={form}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >
          <h3 className={styles.formTitle}>基本信息</h3>

          <FormItem
            {...formItemLayout}
            label="模板名"
            name="name"
            rules={[
              {
                required: true,
                message: '必填',
              },
            ]}
          >
            <Input placeholder="模板名" />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="图片地址"
            name="url"
            rules={[
              {
                required: true,
                message: '必填',
              },
            ]}
          >
            <Input placeholder="还没做上传，将就着填吧！" />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="默认内容"
            name="defaultContent"
          >
            <TextArea
              style={{ minHeight: 32 }}
              placeholder="填不填都行，最好是给我填！"
              rows={4}
            />
          </FormItem>

          {template?.downloadUrl &&
            <div className={styles.image}>
              <TemplateImage templateData={template}></TemplateImage>
            </div>
          }

          <h3 className={styles.formTitle}>文本框设置</h3>

          <Row gutter={24}>
            <Col span={3}>
              <FormItem label="宽" name={['textArea', 'w']}>
                <InputNumber min={10}></InputNumber>
              </FormItem>
            </Col>
            <Col span={3}>
              <FormItem label="高" name={['textArea', 'h']}>
                <InputNumber min={10}></InputNumber>
              </FormItem>
            </Col>
            <Col span={3}>
              <FormItem label="X轴" name={['textArea', 'x']}>
                <InputNumber min={0}></InputNumber>
              </FormItem>
            </Col>
            <Col span={3}>
              <FormItem label="Y轴" name={['textArea', 'y']}>
                <InputNumber min={0}></InputNumber>
              </FormItem>
            </Col>
          </Row>

          <h3 className={styles.formTitle}>文本样式</h3>

          <Row gutter={24}>
            <Col span={3}>
              <FormItem label="颜色" name={['textStyle', 'color']}>
                <Input min={10}></Input>
              </FormItem>
            </Col>
            <Col span={3}>
              <FormItem label="最大字体大小" name={['textStyle', 'maxFontSize']}>
                <InputNumber min={10}></InputNumber>
              </FormItem>
            </Col>
          </Row>

          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={loading}>{id ? '保存' : '创建'}</Button>
            <Button style={{ marginLeft: 8 }}>取消</Button>
          </FormItem>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default connect(({
  loading,
  templateAndEdit
}: {
  loading: { models: { [key: string]: boolean } },
  templateAndEdit: any
}) => ({
  templateAndEdit,
  loading: loading.models.templateAndEdit,
}))(Edit);
