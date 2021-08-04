import { ReloadOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';

interface RefreshButtonProps {
  disabled: boolean;
  running: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  task?: () => Promise<void>;
}

export const RefreshButton = React.memo((props: RefreshButtonProps) => {
  const { disabled, task, setRefresh, running } = props;

  /* const [state, setState] = useState({
    running: disabled,
    show: false,
  });*/
  /*const [running, setRefresh] = useState(disabled);*/
  const [show, setShow] = useState(false);

  const onVisibleChange = (show: boolean) => {
    setShow(show);
    //setState((prev) => ({ ...prev, show }));
  };

  const handleRefresh = () => {
    setShow(false);
    //  setState((prev) => ({ running: true, show: false }));
    const init = moment().valueOf();
    setRefresh(true);
    task &&
      task().finally(() => {
        const end = moment().valueOf();
        const animationTime = Math.ceil((end - init) / 1000) * 1000;

        setTimeout(() => setRefresh(false), animationTime);
      });
  };

  return (
    <Tooltip title="Actualizar" visible={show} onVisibleChange={onVisibleChange}>
      <Button style={{ paddingTop: 0 }} disabled={disabled} type="link" icon={<ReloadOutlined spin={running} />} onClick={handleRefresh} />
    </Tooltip>
  );
});
