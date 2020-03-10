import React, { useState } from 'react';
import './styles.scss';
import { useArticlesPostArticles } from 'api/myApis';
import { Button, Form, Input, Card, message, notification, Modal } from 'antd';
//import { useRouter } from 'next/router';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useRouter } from 'next/router';
import { useAuthToken } from 'providers/account';

const content = {
  entityMap: {},
  blocks: [
    {
      key: '637gr',
      text: 'Initialized from content state.',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};

export const EditorHelper = () => {
  const { userToken } = useAuthToken();
  const router = useRouter();
  const [title, setTitle] = useState('');
  //const [content, setContent] = useState('');
  const { mutate: addPost } = useArticlesPostArticles({});
  const [description, setDescription] = useState('');
  const [state, setState] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw(content)));

  const userName = `${userToken.userInfo.name} ${userToken.userInfo.surname}`;

  const handleSubmit = () => {
    console.log('name', userName);
    const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    // ContentState.createFromBlockArray(JSON.parse(text));
    message.loading('Adding Post....', 1.3);
    addPost({ title, userName, content, description })
      .then(response => {
        console.log(response);
        const args = {
          message: 'Post Succesfully Added',
          description:
            'Your post was succesfully added, to see your post move to the view posts page or add another post.',
          duration: 0,
        };
        notification.open(args);
      })
      .catch(err => console.log(err.response));
  };
  console.log('name2', userName);
  const handleCancel = () => {
    router.push('/public-transport');
  };

  const onEditorStateChange = (editorState: EditorState) => {
    window['convertToRaw'] = convertToRaw;
    window['editorState'] = editorState;
    setEditorState(editorState);
  };

  const showModal = () => {
    setState(true);
  };

  const handleCancelEditor = () => {
    setState(!state);
  };

  const handleOk = () => {
    setState(!state);
  };

  return (
    <Form>
      <div>
        <div className="title">
          <Input placeholder=" Enter Title of post" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <br />
        <div className="description">
          <Input
            placeholder=" Enter a little description of your post or article"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <br />
        <div className="Editor">
          <Card>
            {/* <Editor
              // initialContentState={content}
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={onEditorStateChange}
            /> */}
            <p className="writing">Click the button below, so to write your post.</p>
            <Button type="primary" onClick={showModal}>
              Click button to write your
            </Button>
          </Card>
          <Modal
            visible={state}
            title={title}
            onOk={handleOk}
            onCancel={handleCancelEditor}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Return
              </Button>,
              <Button key="submit" type="primary" onClick={handleOk}>
                Submit
              </Button>,
            ]}
          >
            <Editor
              // initialContentState={content}
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={onEditorStateChange}
            />
          </Modal>
        </div>
      </div>
      <br />
      <div className="buttons">
        <Button type="primary" onClick={handleSubmit} className="login-form-button" block>
          Submit Post
        </Button>
      </div>
      <br />
      <div className="buttons">
        <Button type="danger" onClick={handleCancel} className="login-form-button" block>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default EditorHelper;
