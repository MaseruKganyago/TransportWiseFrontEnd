import React from 'react';
import Layout from 'components/global/layout';
import './styles.scss';
import { useAuthorsGetAuthorAll } from 'api/myApis';
import { Card } from 'antd';

export const About = () => {
  const { data: Author } = useAuthorsGetAuthorAll({});

  return (
    Author && (
      <Layout title="About Us" description="This is About Page">
        <div className="about-us-page">
          <p className="writing">
            This is the <strong>About Us</strong> page
          </p>
          <hr />
          <p className="writing2">
            TransportWise is, An online platform meant to advice road users. Giving information of the efficient ways:
            To save money for their cars fuel. The efficiency of public transport, how you can reduce costs when using
            public transport.
          </p>
          <h3>Below is our Authors:</h3>
          {Author.map(Authors => {
            const { id, name, surname, jobTitle, driverExperience } = Authors;
            return (
              <Card>
                <div key={id}>
                  <p style={{ fontWeight: 'bold' }}>
                    {name} {surname}{' '}
                  </p>
                  <p> {jobTitle}</p>
                  <p> {driverExperience} Driving Experince</p>
                </div>
              </Card>
            );
          })}
        </div>
      </Layout>
    )
  );
};

export default About;
