import React from 'react';
import Layout from 'components/global/layout';
import './styles.scss';
import { Card, Rate } from 'antd';
import { useArticlesGetArticlesAll } from 'api/myApis';

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
            const { id, title, content } = Post;
            return (
              <Card>
                <div key={id}>
                  <p style={{ fontWeight: 'bold' }}>{title}</p>
                  <p> {content}</p>
                </div>
                <Rate />
              </Card>
            );
          })}
        </div>
      </Layout>
    )
  );
}
