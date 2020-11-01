import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, List, Image, Modal, message } from 'antd';
import React, { Component } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { PageContainer } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import { StateType } from './model';
import styles from './style.less';
import AddThemeDialog from './components/AddThemeDialog';
import { addTheme, deleteTheme } from './service';
import { CardListItemDataType } from './data.d';

const { confirm } = Modal;

interface TemplateProps {
  template: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}
interface TemplateState {
  addDialogVisiable: boolean;
}

class Template extends Component<TemplateProps, TemplateState> {

  formRef: any = null;

  constructor(props: TemplateProps) {
    super(props)
    this.state = {} as any
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    const { dispatch } = this.props;
    dispatch({
      type: 'template/fetch',
      payload: {
        count: 8,
      },
    });
  }

  handleAdd = () => {
    this.setState({
      addDialogVisiable: true
    })
  }

  handleAddOk = async (data: any) => {
    const response = await addTheme(data)
    if (response.success) {
      message.success('添加成功');
      this.loadData()
    }
    console.log(response);
    this.setState({ addDialogVisiable: false })
  }

  handleAddCancel = () => {
    this.setState({ addDialogVisiable: false })
  }

  handleEdit = (id: string) => {
    console.log('edit');
  }

  handleDelete = (id: string) => {
    confirm({
      title: '确定要删除此主题?',
      icon: <ExclamationCircleOutlined />,
      content: '删除后不可恢复',
      onOk: async () => {
        const response = await deleteTheme(id)
        if (response.success) {
          message.success('删除成功');
          this.loadData()
        } else {
          message.success('删除失败');
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  render() {
    const {
      template: { list },
      loading,
    } = this.props;

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          表情模板主题
        </p>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img
          alt="这是一个标题"
          src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
        />
      </div>
    );
    const nullData: Partial<CardListItemDataType> = {};
    return (
      <PageContainer content={content} extraContent={extraContent}>
        <div className={styles.cardList}>
          <List<Partial<CardListItemDataType>>
            rowKey="id"
            loading={loading}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 4,
              xxl: 4,
            }}
            dataSource={[nullData, ...list]}
            renderItem={(item) => {
              if (item && item._id) {
                return (
                  <List.Item key={item._id}>
                    <Card
                      hoverable
                      className={styles.card}
                      actions={
                        [
                          <a key="edit" onClick={() => this.handleEdit(item._id)}>编辑</a>,
                          <a key="delete" onClick={() => this.handleDelete(item._id)}>删除</a>
                        ]}
                    >
                      <div>{item.name}</div>
                      <Image src={item.coverUrl} className={styles.coverImg} width={'100%'} height={100}></Image>
                    </Card>
                  </List.Item>
                );
              }
              return (
                <List.Item>
                  <Button type="dashed" onClick={this.handleAdd} className={styles.newButton}>
                    <PlusOutlined /> 新增模板主题
                  </Button>
                </List.Item>
              );
            }}
          />
        </div>
        <AddThemeDialog
          visible={this.state.addDialogVisiable}
          onOk={this.handleAddOk}
          onCancel={this.handleAddCancel}>
        </AddThemeDialog>
      </PageContainer>
    );
  }
}

export default connect(
  ({
    template,
    loading,
  }: {
    template: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    template,
    loading: loading.models.template,
  }),
)(Template);
