import React, { useState } from 'react';
import './styles.scss';
import { useArticlesPostArticles } from './node_modules/api/myApis';
import TextArea from 'antd/lib/input/TextArea';
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/router';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const EditorHelper = () => {
  const [title, setTitle] = useState('');
  //const [content, setContent] = useState('');
  const [userName, setUsername] = useState('');
  const { mutate: addPost } = useArticlesPostArticles({});
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const router = useRouter();

  const handleSubmit = () => {
    addPost({ title, userName })
      .then(response => {
        console.log(response);
        router.push('./showpost');
      })
      .catch(err => console.log(err.response));
  };
  const handleCancel = () => {
    window.location.href = '/public-transport';
  };

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  return (
    <Form>
      <div>
        <div style={{ margin: '24px 0', width: '60%' }}>
          <TextArea placeholder="Enter Title of post" value={title} onChange={e => setTitle(e.target.value)} autoSize />
        </div>
        <div style={{ margin: '24px 0', width: '60%' }}>
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={onEditorStateChange}
          />
        </div>
        <div style={{ margin: '24px 0', width: '20%' }}>
          <Input
            placeholder="Enter Your Name to be revieled with the post. (Optional)"
            value={userName}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
      </div>
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
  );
};

export default EditorHelper;
