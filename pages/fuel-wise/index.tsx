import React from 'react';
import Layout from 'components/global/layout';
import './styles.scss';
import { Card } from 'antd';
import { useFuelWisesGetFuelWiseAll } from 'useApis/swag';

export default function FuelWise() {
  const { data: Tips } = useFuelWisesGetFuelWiseAll({});

  return (
    Tips && (
      <Layout title="FuelWise" description="This is the FuelWisePage">
        <div>
          <div className="fuel-wise-page">
            <p className="writing">
              This is the <strong>FuelWise</strong> page
            </p>
            <p>Feast on our Tips!!... and share yours in the public transport page</p>
            <hr />
            <br />
            {Tips.map(Tip => {
              const { id, title, body } = Tip;
              return (
                <Card>
                  <div key={id}>
                    <p style={{ fontWeight: 'bold' }}>{title}</p>
                    <p> {body}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </Layout>
    )
  );
}
