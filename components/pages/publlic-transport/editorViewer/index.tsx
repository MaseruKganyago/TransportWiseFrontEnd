import React from 'react';
import './styles.scss';
import { Comment, Avatar } from 'antd';
import { useArticlesGetArticlesAll } from 'api/myApis';
import Link from 'next/link';
import { useAuthToken } from 'providers/account';

export default function EditViewer() {
  const { data: Posts } = useArticlesGetArticlesAll({});
  const { userToken } = useAuthToken();
  console.log('userTokenCheck', userToken);
  const user = userToken && userToken.userInfo;
  console.log('user', user);

  return (
    Posts && (
      <div>
        {Posts.map(Post => {
          const { id, title, description, userName, image } = Post;
          {
            console.log('userName', image);
          }
          return (
            <div key={id}>
              <Comment
                //actions={actions}
                author={userName}
                avatar={
                  <Avatar
                    src={`https://localhost:44352/api/Images?Name=${image}`}
                    style={{ backgroundColor: '#ffffff' }}
                  />
                }
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
              />
            </div>
          );
        })}
      </div>
    )
  );
}
