import React from 'react';
import Layout from 'components/global/layout';
import { useRouter } from 'next/router';
import { useArticlesGetArticlesAll } from 'api/myApis';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';
import { Button } from 'antd';
import './styles.scss';

export default function ShowPost() {
  const { query } = useRouter();
  const { data: Articles } = useArticlesGetArticlesAll({});
  const route = useRouter();

  // useGetPostDetails => id => query
  const convertCommentFromJSONToHTML = content => {
    if (content == null) return null;
    return stateToHTML(convertFromRaw(JSON.parse(content)));
  };
  function handleRouteAdd() {
    route.push('/public-transport/addpost');
  }
  console.log(query.id);

  // Create an edpoint for getting posts by id. Then pass this id.

  // When you get the resulst, you just render
  //   <p>
  //     <div
  //         dangerouslySetInnerHTML={{
  //         __html: convertCommentFromJSONToHTML(news),
  //         }}
  //     ></div>
  // </p>

  return (
    Articles && (
      <div>
        {Articles.map(Article => {
          const { id, content } = Article;

          if (id === query.id) {
            return (
              <Layout title="Post" description="This is the FuelWisePage">
                <div className="viewArticle">
                  <p className="writing">
                    This is the <strong>PublicTransport</strong> articles page
                    <Button type="primary" onClick={handleRouteAdd}>
                      Add a new Post
                    </Button>
                  </p>
                  <hr />
                  <br />
                  <p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: convertCommentFromJSONToHTML(content),
                      }}
                    ></div>
                  </p>
                </div>
              </Layout>
            );
          }
        })}
      </div>
    )
  );
}
