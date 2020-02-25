import React from 'react';
import Layout from 'components/global/layout';
import './styles.scss';
import { Tooltip, Comment, Avatar } from 'antd';
import { useArticlesGetArticlesAll } from 'api/myApis';
import moment from 'moment';

export default function FuelWise() {
  const { data: Posts } = useArticlesGetArticlesAll({});

  return (
    Posts && (
      <Layout title="FuelWise" description="This is the FuelWisePage">
        <div>
          <p className="writing">
            This is the <strong>PublicTransport</strong> posts page
          </p>
          <hr />
          <br />
          {Posts.map(Post => {
            const { id, title, content, userName } = Post;
            return (
              <div key={id}>
                <Comment
                  //actions={actions}
                  author={userName}
                  avatar={<Avatar style={{ backgroundColor: '#87d068' }} icon="user" />}
                  content={
                    <p>
                      <h1>{title}</h1>
                      {content}
                    </p>
                  }
                  datetime={
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                      <span>{moment().fromNow()}</span>
                    </Tooltip>
                  }
                />
              </div>
            );
          })}
        </div>
      </Layout>
    )
  );
}
