import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2020 抽屉表情"
    links={[
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/hzjjg/wechat_meme_admin',
        blankTarget: true,
      },
    ]}
  />
);
