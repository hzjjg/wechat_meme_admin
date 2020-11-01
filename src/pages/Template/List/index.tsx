import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, List, Image, Pagination, Modal, message } from 'antd';
import React, { Component } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { PageContainer } from '@ant-design/pro-layout';
import { connect, Dispatch, Link, history } from 'umi';
import { StateType } from './model';
import { CardListItemDataType } from './data.d';
import styles from './style.less';
import { deleteTemplate } from './service';

const { confirm } = Modal

interface ListProps {
  templateAndList: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}
interface ListState {
  visible: boolean;
  done: boolean;
  current?: Partial<CardListItemDataType>;
}

class TemplateList extends Component<
  ListProps,
  ListState
  > {
  componentDidMount() {
    this.loadData()
  }

  loadData(page?: number, pageSize?: number) {
    const {
      templateAndList: { pager },
    } = this.props;
    const { dispatch } = this.props;
    dispatch({
      type: 'templateAndList/fetch',
      payload: {
        page: page || pager.page,
        pageSize: pageSize || pager.pageSize
      },
    });
  }

  handlePageChange = (page: number, pageSize?: number) => {
    this.loadData(page, pageSize)
  }

  handleDelete = (id: string) => {
    const {
      templateAndList: { pager },
    } = this.props;
    confirm({
      title: '确定要删除此模板?',
      icon: <ExclamationCircleOutlined />,
      content: '删除后不可恢复',
      onOk: async () => {
        const response = await deleteTemplate(id)
        if (response.success) {
          message.success('删除成功');
          this.loadData(pager.page, pager.pageSize)
        } else {
          message.success('删除失败');
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  handleEdit = (id: string) => {
    history.push({
      pathname: '/template/edit',
      query: {
        id
      },
    });
  }

  render() {
    const {
      templateAndList: { list, pager },
      loading,
    } = this.props;

    const content = (
      <div className={styles.pageHeaderContent}>
        <p> 模板列表 </p>
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

        <Pagination
          className={styles.pagination}
          current={pager.page}
          showSizeChanger={true}
          pageSize={pager.pageSize}
          total={pager.total}
          pageSizeOptions={['10', '20', '50']}
          onChange={this.handlePageChange} />

        <div className={styles.cardList}>
          <List<Partial<CardListItemDataType>>
            rowKey="id"
            loading={loading}
            grid={{
              gutter: 16,
              xs: 2,
              sm: 3,
              md: 4,
              lg: 5,
              xl: 6,
              xxl: 8,
            }}
            dataSource={[nullData, ...list]}
            renderItem={(item) => {
              if (item && item._id) {
                return (
                  <List.Item key={item._id}>
                    <Card
                      hoverable
                      className={styles.card}
                      actions={[
                        <a onClick={() => this.handleEdit(item._id as string)}>编辑</a>,
                        <a onClick={() => this.handleDelete(item._id as string)}>删除</a>
                      ]}
                    >
                      <p className={styles.templateName}>{item.name || '---'}</p>
                      <Image src={item.url} className={styles.templateUrl} width={'100%'} height={100}></Image>
                      <p className={`${styles.templateDefContent}`} title={item.defaultContent}>{item.defaultContent || '---'}</p>
                    </Card>
                  </List.Item>
                );
              }
              return (
                <List.Item>
                  <Link to="/template/add">
                    <Button type="dashed" className={styles.newButton}>
                      <PlusOutlined /> 新建模板
                  </Button>
                  </Link>
                </List.Item>
              );
            }}
          />
        </div>
      </PageContainer>
    );
  }
}

export default connect(
  ({
    templateAndList,
    loading,
  }: {
    templateAndList: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    templateAndList,
    loading: loading.models.templateAndList,
  }),
)(TemplateList);
