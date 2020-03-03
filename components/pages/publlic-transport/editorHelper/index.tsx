import React, { useState } from 'react';
import './styles.scss';
import { useArticlesPostArticles } from 'api/myApis';
import TextArea from 'antd/lib/input/TextArea';
import { Button, Form, Input, Card } from 'antd';
//import { useRouter } from 'next/router';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useRouter } from 'next/router';
import { route } from 'next/dist/next-server/server/router';

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
  const router = useRouter();
  const [title, setTitle] = useState('');
  //const [content, setContent] = useState('');
  const [userName, setUsername] = useState('');
  const { mutate: addPost } = useArticlesPostArticles({});
  const [description, setDescription] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw(content)));

  // let v =
  //const router = useRouter();

  const handleSubmit = () => {
    const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    // ContentState.createFromBlockArray(JSON.parse(text));

    addPost({ title, userName, content, description })
      .then(response => {
        console.log(response);
        router.push('./showpost');
        //window.location.href = './showpost';
      })
      .catch(err => console.log(err.response));
  };
  const handleCancel = () => {
    router.push('./public-transport');
    //window.location.href = '/public-transport';
  };

  const onEditorStateChange = (editorState: EditorState) => {
    window['convertToRaw'] = convertToRaw;
    window['editorState'] = editorState;

    setEditorState(editorState);
  };

  return (
    <Form>
      <div>
        <div className="title">
          <TextArea
            placeholder=" Enter Title of post"
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoSize
          />
        </div>
        <br />
        <div className="description">
          <TextArea
            placeholder=" Enter a little description of your post or article"
            value={description}
            onChange={e => setDescription(e.target.value)}
            autoSize
          />
        </div>
        <br />
        <div className="Editor">
          <Card>
            <Editor
              // initialContentState={content}
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={onEditorStateChange}
            />
          </Card>
        </div>
        <br />
        <div className="nameHolder">
          <Input
            placeholder=" Enter Your Name to be revieled with the post. (Optional)"
            value={userName}
            onChange={e => setUsername(e.target.value)}
          />
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
