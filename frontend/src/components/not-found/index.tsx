import { Button, Result } from 'antd';
import React from 'react';
import { Wrapper } from 'src/components/wrapper';
import { goToHomePage } from 'src/utils/history.utils';

export const NotFound: React.FC = (props) => {
  return (
    <Wrapper contentWrapper unselectable>
      <Result
        status="404"
        title="404"
        subTitle="Content not found"
        extra={
          <Button type="primary" onClick={goToHomePage}>
            Home
          </Button>
        }
      />
    </Wrapper>
  );
};
