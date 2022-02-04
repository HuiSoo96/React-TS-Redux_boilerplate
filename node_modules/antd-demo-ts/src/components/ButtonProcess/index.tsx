import React from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store';
import { ProcessTypes, ProcessState } from '../../store/ducks/process/types';
import './buttonProcess.scss';

const ButtonProcess: React.FC = () => {
  const dispatch = useDispatch();
  const process = useSelector<ApplicationState, ProcessState>(
    (state) => state.process,
  );

  const handleSubmit = (): void => {
    console.log(process.data);
    dispatch({ type: ProcessTypes.GET_PROCESS });
  };

  return (
    <div className="buttonProcess">
      <Button onClick={handleSubmit} size="large" type="primary">
        Carregar processos
      </Button>
      <div className="content-process">
        {process.data
          ? JSON.stringify(process.data)
          : 'Nenhum processo carregado'}
      </div>
    </div>
  );
};

export default ButtonProcess;
