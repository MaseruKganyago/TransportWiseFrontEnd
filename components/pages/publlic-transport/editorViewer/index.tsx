import React, { useState } from 'react';
import './styles.scss';
import { Tooltip, Comment, Avatar, Modal } from 'antd';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';
import { useArticlesGetArticlesAll } from 'api/myApis';
import moment from 'moment';

export default function EditViewer() {
  const { data: Posts } = useArticlesGetArticlesAll({});
  const [state, setState] = useState(false);
  const [head, setHead] = useState('');
  const [news, setNews] = useState(null);

  const handleModal = (title, data) => {
    console.log('data', data);
    setState(!state);
    setHead(title);
    setNews(data);
  };

  const handleCancel = () => {
    setState(!state);
  };

  const handleOk = () => {
    setState(!state);
  };

  const convertCommentFromJSONToHTML = content => {
    if (content == null) return null;
    return stateToHTML(convertFromRaw(JSON.parse(content)));
  };

  return (
    Posts && (
      <div>
        {Posts.map(Post => {
          const { id, title, description, content: data, userName } = Post;

          return (
            <div key={id}>
              <Comment
                //actions={actions}
                author={userName}
                avatar={<Avatar style={{ backgroundColor: '#87d068' }} icon="user" />}
                content={
                  <p>
                    <h3>
                      <a onClick={() => handleModal(title, data)}>{title}</a>
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
        <Modal visible={state} title={head} onCancel={handleCancel} onOk={handleOk}>
          <p>
            <div
              dangerouslySetInnerHTML={{
                __html: convertCommentFromJSONToHTML(news),
              }}
            ></div>
          </p>
        </Modal>
      </div>
    )
  );
}
