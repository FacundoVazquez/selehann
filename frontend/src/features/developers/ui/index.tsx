import { Popconfirm, Switch } from 'antd';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/store/store.hooks';
import { LoadingContent } from 'src/components/loading';
import { ServiceError } from 'src/components/service-error';
import { ColumnTypeEx } from 'src/components/table';
import { Wrapper } from 'src/components/wrapper';
import { Texts } from 'src/constants/texts';
import { fetchAssets, revokeAssetsByDeveloper } from 'src/features/resources/assets/logic';
import { fetchLicenses, revokeLicensesByDeveloper } from 'src/features/resources/licenses/logic';
import { Message } from 'src/helpers/message.helper';
import { hasError, isFetchingData } from 'src/helpers/validation.helper';
import { getViewWidth } from 'src/utils/screen.utils';
import { compare } from 'src/utils/string.utils';
import { FetchDevelopersDto, SetDeveloperStatusDto } from '../data/dto';
import { Developer } from '../data/types';
import { fetchDevelopers, setDeveloperStatus } from '../logic';
import { TableDevelopers } from './table.developers';

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

  const shared = useAppSelector((s) => s.shared);

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
    fetchAllResources();
  }, []);

  //#endregion

  //#region Handlers

  const handleDeveloperStatus = async (body: SetDeveloperStatusDto) => {
    const result = await dispatch(setDeveloperStatus({ body }));

    if (setDeveloperStatus.fulfilled.match(result)) {
      body.developerIds.forEach((id) => {
        dispatch(revokeAssetsByDeveloper(id));
        dispatch(revokeLicensesByDeveloper(id));
      });
    }

    if (setDeveloperStatus.rejected.match(result)) Message.error(Texts.DEVELOPER_STATUS_ERROR);
  };

  //#endregion

  //#region Other functions

  const fetchAllResources = () => {
    dispatch(fetchDevelopers({}));
    dispatch(fetchAssets({}));
    dispatch(fetchLicenses({}));
  };

  //#endregion

  const isContentLoading = isFetchingData(shared);

  const hasContentError = hasError(shared);

  //#region Renders

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
      {isContentLoading ? <LoadingContent /> : hasContentError ? <ServiceError /> : <TableDevelopers columns={mergedColumns} />}
    </Wrapper>
  );
};
