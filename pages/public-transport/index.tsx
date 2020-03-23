import React, { useLayoutEffect } from 'react';
import Layout from 'components/global/layout/';
import './styles.scss';
import '/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dynamic from 'next/dynamic';
import { Button } from 'antd';
import { useRouter } from 'next/router';

let EditorViewer;

export default function ShowPost() {
  useLayoutEffect(() => {
    EditorViewer = dynamic(() => import('components/pages/publlic-transport/editorViewer'));
  }, []);

  const route = useRouter();

  function handleRouteAdd() {
    route.push('/public-transport/addpost');
  }

  return (
    <Layout title="FuelWise" description="This is the FuelWisePage">
      <div className="Wrapper">
        <div className="header">
          <p className="writing">
            This is the <strong>PublicTransport</strong> page
          </p>
          <Button type="primary" onClick={handleRouteAdd}>
            Add a new Post
          </Button>
        </div>
        {EditorViewer && <EditorViewer />}
      </div>
    </Layout>
  );
}
