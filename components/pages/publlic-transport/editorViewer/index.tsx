import React from 'react';
import './styles.scss';
import { Tooltip, Comment, Avatar } from 'antd';

import { useArticlesGetArticlesAll } from 'api/myApis';
import moment from 'moment';
import Link from 'next/link';

export default function EditViewer() {
  const { data: Posts } = useArticlesGetArticlesAll({});

  return (
    Posts && (
      <div>
        {Posts.map(Post => {
          const { id, title, description, userName } = Post;

          return (
            <div key={id}>
              <Comment
                //actions={actions}
                author={userName}
                avatar={<Avatar style={{ backgroundColor: '#87d068' }} icon="user" />}
                content={
                  <p>
                    <h3>
                      <Link href={`/public-transport/showpost/details?id=${id}`}>
                        <a>{title}</a>
                      </Link>
                    </h3>
                    <p>{description}</p>
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
    )
  );
}
