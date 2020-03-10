import React, { useEffect } from 'react';
import Layout from 'components/global/layout';
import './styles.scss';
import '/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dynamic from 'next/dynamic';
import { Button } from 'antd';
import { useRouter } from 'next/router';

let EditorViewer;

export default function ShowPost() {
  useEffect(() => {
    EditorViewer = dynamic(() => import('components/pages/publlic-transport/editorViewer'));
  }, []);

  const route = useRouter();

  function handleRouteAdd() {
    route.push('/public-transport/addpost');
  }

  return (
    <Layout title="FuelWise" description="This is the FuelWisePage">
      <div className="Poster">
        <p className="writing">
          This is the <strong>PublicTransport</strong> page
          <Button type="primary" onClick={handleRouteAdd}>
            Add a new Post
          </Button>
        </p>
        <hr />
        <br />
      </div>
      {EditorViewer && <EditorViewer />}
    </Layout>
  );
}
