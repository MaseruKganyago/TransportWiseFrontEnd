import React, { useEffect } from 'react';
import Layout from 'components/global/layout';
import './styles.scss';
import '/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import dynamic from 'next/dynamic';
let EditorHelper;
// const EditorHelper = React.lazy(() => import('components/pages/publlic-transport/editorHelper'));

export const Addpost = () => {
  useEffect(() => {
    EditorHelper = dynamic(() => import('components/pages/publlic-transport/editorHelper'));

    console.log('EditorHelper', EditorHelper);
  }, []);

  return (
    <Layout title="Addpost" description="This is the Addpost Page">
      <div>
        <p className="writing">
          This is the <strong>PublicTransport</strong> add post page
        </p>
        <hr />
        <br />
      </div>

      {EditorHelper && <EditorHelper />}
    </Layout>
  );
};

export default Addpost;
