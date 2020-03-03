import React, { useLayoutEffect } from 'react';
import Layout from 'components/global/layout';
import './styles.scss';
import '/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dynamic from 'next/dynamic';

let EditorViewer;

export default function ShowPost() {
  useLayoutEffect(() => {
    EditorViewer = dynamic(() => import('components/pages/publlic-transport/editorViewer'));
  }, []);

  return (
    <Layout title="FuelWise" description="This is the FuelWisePage">
      <div>
        <p className="writing">
          This is the <strong>PublicTransport</strong> posts page
        </p>
        <hr />
        <br />
      </div>
      {EditorViewer && <EditorViewer />}
    </Layout>
  );
}
