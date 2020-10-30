import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, List, Typography, Image } from 'antd';
import React, { Component } from 'react';

import { PageContainer } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import { StateType } from './model';
import { CardListItemDataType } from './data.d';
import styles from './style.less';

const { Paragraph } = Typography;

interface TemplateProps {
  template: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}
interface TemplateState {
  visible: boolean;
  done: boolean;
  current?: Partial<CardListItemDataType>;
}

class Template extends Component<
  TemplateProps,
  TemplateState
  > {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'template/fetch',
      payload: {
        count: 8,
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
        <div className={styles.contentLink}>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{' '}
            快速开始
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{' '}
            产品简介
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{' '}
            产品文档
          </a>
        </div>
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
                      actions={[<a key="edit">编辑</a>]}
                    >
                      <div>{item.name}</div>
                      <Image src={item.coverUrl} className={styles.coverImg} width={'100%'} height={100}></Image>
                    </Card>
                  </List.Item>
                );
              }
              return (
                <List.Item>
                  <Button type="dashed" className={styles.newButton}>
                    <PlusOutlined /> 新增模板主题
                  </Button>
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
