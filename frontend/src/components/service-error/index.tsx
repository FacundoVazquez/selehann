import { Button, Result } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Wrapper } from 'src/components/wrapper';
import { getRoute, goToHomePage, goTo } from 'src/utils/history.utils';

export const ServiceError: React.FC = (props) => {
  const history = useHistory();

  const renderSubtitle = () => {
    return (
      <div>
        <span>Content can't be loaded. Service unavailable</span>
        <br />
        <span>Please, try later</span>
      </div>
    );
  };

  const refresh = () => {
    // goTo(getRoute());
    window.location.reload();
  };

  return (
    <Wrapper horizontal="center" vertical="middle" unselectable>
      <Result
        style={{ minWidth: 400, height: '100%' }}
        status="error"
        title="Error"
        subTitle={renderSubtitle()}
        extra={
          <Button type="primary" onClick={refresh}>
            Refresh
          </Button>
        }
      />
    </Wrapper>
  );
};
