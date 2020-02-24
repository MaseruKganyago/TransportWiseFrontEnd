import React, { useState } from 'react';
import Layout from 'components/global/layout';
import './styles.scss';
import { useArticlesPostArticles } from 'api/myApis';
import TextArea from 'antd/lib/input/TextArea';
import { Button, Form } from 'antd';

export const Addpost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { mutate: addPost } = useArticlesPostArticles({});

  const handleSubmit = () => {
    addPost({ title, content })
      .then(response => {
        console.log(response);
        window.location.href = './showpost';
      })
      .catch(err => console.log(err.response));
  };
  const handleCancel = () => {
    window.location.href = '/public-transport';
  };

  return (
    <Layout title="Addpost" description="This is the Addpost Page">
      <div>
        <p className="writing">
          This is the <strong>PublicTransport</strong> add post page
        </p>
        <hr />
        <Form>
          {
            <div>
              <div style={{ margin: '24px 0', width: '60%' }}>
                <TextArea
                  placeholder="Enter Title of post"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  autoSize
                />
              </div>
              <div style={{ margin: '24px 0', width: '60%' }}>
                <TextArea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Write your article here"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </div>
            </div>
          }
          <div style={{ margin: '24px 0', width: '30%' }}>
            <Button type="primary" onClick={handleSubmit} className="login-form-button" block>
              Submit Post
            </Button>
          </div>

          <div style={{ margin: '24px 0', width: '30%' }}>
            <Button type="danger" onClick={handleCancel} className="login-form-button" block>
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default Addpost;
