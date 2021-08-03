import { Popconfirm, Switch, Tag } from 'antd';
import React, { Key, useEffect, useState } from 'react';
import { RootState } from 'src/app/store';
import { useAppDispatch, useAppSelector } from 'src/app/store/store.hooks';
import { LoadingContent } from 'src/components/loading';
import { ServiceError } from 'src/components/service-error';
import { ColumnTypeEx, Table } from 'src/components/table';
import { Wrapper } from 'src/components/wrapper';
import { Texts } from 'src/constants/texts';
import { Paginator } from 'src/features/_shared/data/interfaces';
import { hasError, isFetchingData } from 'src/helpers/validation.helper';
import { getViewWidth } from 'src/utils/screen.utils';
import { compare } from 'src/utils/string.utils';
import { FetchDevelopersDto, SetDeveloperStatusDto } from '../data/dto';
import { Developer } from '../data/types';
import { fetchDevelopers, setDeveloperStatus } from '../logic';
import { ResourceComponent } from '../../resources/ui';
import styles from './style.module.less';
import { Resource } from 'src/api/types';
import { fetchLicenses, fetchLicensesByDeveloper } from 'src/features/resources/licenses/logic';
import { FetchLicensesDto } from 'src/features/resources/licenses/data/dto';
import { FetchAssetsDto } from 'src/features/resources/assets/data/dto';
import { fetchAssets, fetchAssetsByDeveloper } from 'src/features/resources/assets/logic';
import { Message } from 'src/helpers/message.helper';

interface DevelopersState {
  expandedRow: Key;
}

const columns: ColumnTypeEx<Developer>[] = [
  {
    key: 'key',
    dataIndex: 'key',
    title: Texts.ID,
    width: 250,
    sorter: { compare: (a, b) => compare(a.key, b.key), multiple: -1 },
  },
  {
    key: 'fullname',
    dataIndex: 'fullname',
    title: Texts.DEVELOPER_NAME,
    width: 250,
    sorter: { compare: (a, b) => compare(a.fullname, b.fullname), multiple: -1 },
  },
  {
    key: 'active',
    dataIndex: 'active',
    title: Texts.DEVELOPER_STATUS,
    width: 250,
    sorter: { compare: (a, b) => compare(+a.active, +b.active), multiple: -1 },
  },
];

export const Developers: React.FC = (props) => {
  const dispatch = useAppDispatch();
  const developers = useAppSelector((state: RootState) => state.developers);
  const { assets, licenses } = useAppSelector((state: RootState) => state);
  const shared = useAppSelector((state: RootState) => state.shared);

  const [state, setState] = useState<DevelopersState>();

  const mergedColumns = columns.map((column) => {
    if (column.key !== 'active') return column;

    return {
      ...column,
      render: (value: any, record: Developer) => (
        <Popconfirm
          placement="rightBottom"
          title={Texts.ASK_CONFIRMATION}
          onConfirm={() => handleDeveloperStatus({ developerIds: [`${record.key}`], active: !record.active })}
          okText={Texts.YES}
          cancelText={Texts.NO}>
          <Switch checked={record.active} checkedChildren={Texts.ACTIVE} unCheckedChildren={Texts.INACTIVE} /* onChange={handleDeveloperStatus} */ />
        </Popconfirm>
      ),
    };
  });

  //#region UseEffects

  useEffect(() => {
    fetchDevelopersData();
    fetchAllResource();
  }, []);

  //#endregion

  //#region Handlers

  const handleDeveloperStatus = async (body: SetDeveloperStatusDto) => {
    const result = await dispatch(setDeveloperStatus({ body }));

    if (setDeveloperStatus.rejected.match(result)) Message.error(Texts.DEVELOPER_STATUS_ERROR);
  };

  const handleOnPaginationChange = (current?: number, pageSize?: number) => {
    const paginator: Paginator = { current, pageSize };
    // dispatch(setPaginator(paginator));
  };

  //#endregion

  //#region Other functions

  const fetchDevelopersData = async (body?: FetchDevelopersDto) => {
    dispatch(fetchDevelopers({ body }));
  };

  const fetchAllResource = async () => {
    dispatch(fetchAssets({}));
    dispatch(fetchLicenses({}));
    dispatch(fetchDevelopers({}));
  };

  const fetchResourcesByDeveloper = async (placeholders?: FetchAssetsDto | FetchLicensesDto) => {
    dispatch(fetchAssetsByDeveloper({ placeholders: { ...placeholders } }));
    dispatch(fetchLicensesByDeveloper({ placeholders: { ...placeholders } }));
  };

  //#endregion

  const isContentLoading = isFetchingData(shared);

  const hasContentError = hasError(shared);

  //#region Renders

  const renderTable = () => {
    return (
      <Wrapper contentBody direction="row" horizontal="center">
        <Table
          rowKey={'key'}
          className={styles.table}
          size={'small'}
          scroll={{ y: '500px' }}
          fill
          columns={mergedColumns}
          dataSource={developers?.data?.developers}
          loading={developers.data.fetchDevelopers?.loading}
          hideRowSelection
          extraColumns={{ showKeyColumn: true, showActionsColumn: false }}
          extraComponents={[
            {
              key: 'records-count-tag',
              node: 'records-count-tag',
              position: 'top',
              style: { marginLeft: 'auto', display: 'table' },
            },
          ]}
          sortable
          pagination={
            {
              /*  current: developers.data.paginator?.current,
            pageSize: developers.data.paginator?.pageSize,
            total: developers.data.paginator?.total,
            onChange: handleOnPaginationChange, */
            }
          }
          expandable={{
            expandedRowRender: (record) => (
              <ResourceComponent
                titles={[Texts.AVAILABLE, Texts.ASSIGNED]}
                currentDeveloper={`${record.key}`}
                //  dataSources={{ [record.key]: assets.data.fetchAssets?.loading ? [] : assets.data.assets! }}
                //   targetKeys={assets.data.fetchAssetsByDeveloper?.loading ? [] : [assets.data.assetsByDeveloper![record.key as any] as any]}
              />
            ),
            expandedRowKeys: state?.expandedRow ? [state?.expandedRow] : undefined,
            onExpand: async (expanded, record) => {
              if (expanded) fetchResourcesByDeveloper({ id: record.key });
              setState((s) => ({ ...s, expandedRow: expanded ? record.key : '' }));
            },
          }}
        />
      </Wrapper>
    );
  };

  //#endregion

  return (
    <Wrapper
      contentWrapper
      unselectable
      direction="column"
      vertical="top"
      horizontal="center"
      style={{ minWidth: getViewWidth(isContentLoading || hasContentError) }}>
      {/*   {isContentLoading ? <LoadingContent /> : renderTable()} */}
      {isContentLoading ? <LoadingContent /> : hasContentError ? <ServiceError /> : renderTable()}
    </Wrapper>
  );
};
