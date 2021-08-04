import { Button, Form, Input, Modal, TablePaginationConfig } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/store/store.hooks';
import { Table } from 'src/components/table';
import { Wrapper } from 'src/components/wrapper';
import { Texts } from 'src/constants/texts';
import { revokeAssetsByDeveloper } from 'src/features/resources/assets/logic';
import { revokeLicensesByDeveloper } from 'src/features/resources/licenses/logic';
import { ResourceComponent } from 'src/features/resources/ui';
import { Message } from 'src/helpers/message.helper';
import { addDeveloper } from '../logic';
import styles from './style.module.less';

interface TableDevelopersProps {
  columns: any;
}

interface TableDevelopersState {
  expandedRow: string;
  showModal: boolean;
  pagination: TablePaginationConfig;
}

interface AddDeveloperForm {
  fullname: string;
}

export const TableDevelopers: React.FC<TableDevelopersProps> = (props) => {
  const { columns } = props;

  const dispatch = useAppDispatch();
  const developers = useAppSelector((s) => s.developers);
  const [state, setState] = useState<TableDevelopersState>({
    expandedRow: '',
    showModal: false,
    pagination: {
      current: 1,
      pageSize: 15,
      pageSizeOptions: ['15', '30', '50', '100'],
      onChange: (page, pageSize) => {
        setState((s) => ({ ...s, pagination: { ...s.pagination, current: page, pageSize } }));
      },
    },
  });

  const [form] = Form.useForm<AddDeveloperForm>();

  const handleAddButton = () => {
    setState((s) => ({ ...s, showModal: true }));
  };

  const onConfirm = () => {
    form
      .validateFields()
      .then(async ({ fullname }) => {
        const result = await dispatch(addDeveloper({ body: { fullname } }));
        if (addDeveloper.fulfilled.match(result)) {
          setState((s) => ({ ...s, showModal: false }));
          form.resetFields();

          const { id } = result.payload.data! || {};

          dispatch(revokeAssetsByDeveloper(id));
          dispatch(revokeLicensesByDeveloper(id));

          setState((s) => ({
            ...s,
            pagination: { ...s.pagination, current: Math.ceil(((developers?.data?.developers?.length ?? 0) + 1) / s.pagination.pageSize!) },
          }));
          Message.success(Texts.DEVELOPER_ADD_OK);
        } else if (addDeveloper.rejected.match(result)) {
          Message.error(Texts.DEVELOPER_ADD_ERROR);
        }
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const onCancel = () => {
    setState((s) => ({ ...s, showModal: false }));
  };

  return (
    <Wrapper contentBody direction="row" horizontal="center">
      <Table
        rowKey={'key'}
        className={styles.table}
        size={'small'}
        scroll={{ y: '750px' }}
        sortable
        columns={columns}
        dataSource={developers?.data?.developers}
        loading={developers.data.fetchDevelopers?.loading}
        hideRowSelection
        extraColumns={{ showKeyColumn: true, showActionsColumn: false }}
        extraComponents={[
          {
            key: 'button-add-developer',
            node: (
              <Button style={{ width: 140 }} onClick={handleAddButton}>
                {Texts.ADD_DEVELOPER}
              </Button>
            ),
            position: 'top',
          },
          {
            key: 'records-count-tag',
            node: 'records-count-tag',
            position: 'top',
            style: { marginLeft: 'auto', display: 'table' },
          },
        ]}
        expandable={{
          expandedRowRender: (record) => {
            return <ResourceComponent titles={[Texts.AVAILABLE, Texts.ASSIGNED]} developerId={`${state?.expandedRow}`} />;
          },
          expandedRowKeys: state?.expandedRow ? [state?.expandedRow] : undefined,
          rowExpandable: (record) => {
            return developers.data.developers?.find((d) => d.key === record.key)?.active || false;
          },
          onExpand: async (expanded, record) => {
            //if (expanded) fetchResourcesByDeveloper({ id: record.key });
            setState((s) => ({ ...s, expandedRow: expanded ? record.key : '' }));
          },
        }}
        pagination={{ ...state.pagination }}
      />
      <Modal
        visible={state.showModal}
        title={Texts.ADD_DEVELOPER}
        okText={Texts.CONFIRM}
        cancelText={Texts.CANCEL}
        destroyOnClose={true}
        onCancel={onCancel}
        onOk={onConfirm}>
        <Form form={form} layout="vertical">
          <Form.Item name="fullname" label={Texts.FULL_NAME} rules={[{ required: true, pattern: /./, message: Texts.FIELD_REQUIRED }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Wrapper>
  );
};
