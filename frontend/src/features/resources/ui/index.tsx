import { Tabs, Transfer } from 'antd';
import { TransferDirection, TransferItem } from 'antd/lib/transfer';
import React, { Key, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/store/store.hooks';
import { Wrapper } from 'src/components/wrapper';
import { Texts } from 'src/constants/texts';
import { FetchAssetsDto } from 'src/features/resources/assets/data/dto';
import { Message } from 'src/helpers/message.helper';
import { Asset } from '../assets/data/types';
import { setAssets } from '../assets/logic';
import { Resource } from '../types';
import { AssignRevokeResourcesDto } from '../_data/types';

interface ResourceComponentProps {
  titles?: string[];
  dataSources?: { [key: string]: Resource[] };
  currentDeveloper: string;
}

interface ResourcesComponentState {
  currentPanel: string;
  targetKeys: string[];
  dataSources: { [key: string]: Resource[] };
}

interface ResourcePanelProps {
  key: string;
  title: string;
}

const resourcePanels: ResourcePanelProps[] = [
  {
    key: 'assets',
    title: 'Assets',
  },
  {
    key: 'licenses',
    title: 'Licenses',
  },
];

export const ResourceComponent: React.FC<ResourceComponentProps> = (props) => {
  const { titles, dataSources, currentDeveloper } = props;

  const dispatch = useAppDispatch();
  const { assets, licenses } = useAppSelector((s) => s);

  const [state, setState] = useState<ResourcesComponentState>({
    // currentDeveloper: ,
    currentPanel: resourcePanels[0].key,
    targetKeys: [],
    dataSources: {
      assets: assets.data.fetchAssets?.loading ? [] : assets.data.assets!,
      licenses: licenses.data.fetchLicenses?.loading ? [] : licenses.data.licenses!,
    },
    // dataSources: dataSources,
  });

  //#region UseEffects

  useEffect(() => {
    // fetchData();
  }, []);

  useEffect(() => {
    const _arr =
      state.currentPanel === resourcePanels[0].key
        ? (assets.data.assetsByDeveloper! ?? {})[currentDeveloper]
        : (licenses.data.licensesByDeveloper! ?? {})[currentDeveloper];

    setState((s) => ({
      ...s,
      targetKeys: _arr?.map((res) => `${res.key}`),
    }));
  }, [state.currentPanel, assets, licenses]);

  //#endregion

  //#region Handlers

  const handlerPanels = (activeKey: string) => {
    setState((s) => ({
      ...s,
      currentPanel: activeKey,
    }));
  };

  const handlerTransfer = async (targetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {
    const body: AssignRevokeResourcesDto = {
      resourceIds: moveKeys,
    };

    const placeholders = {
      id: currentDeveloper,
      action: direction === 'right' ? 'assign' : 'revoke',
    };

    let result = null;

    if (state.currentPanel === 'assets') result = await dispatch(setAssets({ body, placeholders }));
    else result = await dispatch(setAssets({ body, placeholders }));

    if (setAssets.rejected.match(result)) {
      Message.error(Texts.DEVELOPER_RESOURCE_ERROR);
    }
  };

  //#endregion

  //#region Other functions

  const mapResourceToTransferItem = (resource: Resource) => {
    const isAsset = (resource: Resource): resource is Asset => (resource as Asset).brand !== undefined;

    if (isAsset(resource))
      return {
        key: resource.key,
        title: `${resource.brand} ${resource.type}`,
        description: resource.model,
      } as TransferItem;
    else
      return {
        key: resource.key,
        title: resource.software,
        description: resource.software,
      } as TransferItem;
  };

  //#endregion

  //#region Renders

  const renderResourcesPanel = (panels: ResourcePanelProps[]) => {
    return (
      <Wrapper contentBody direction="row" horizontal="center">
        <Tabs /* className={styles.tabs}  */ activeKey={state.currentPanel} onChange={handlerPanels} centered>
          {panels?.map((panel) => {
            const { key, title } = panel || {};
            return (
              <Tabs.TabPane key={key} tab={title}>
                {renderResourceList()}
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      </Wrapper>
    );
  };

  const renderResourceList = () => {
    return (
      <Transfer
        titles={titles?.map((t) => `${t} ${state.currentPanel}`)}
        dataSource={state.dataSources[state.currentPanel]?.map((resource) => mapResourceToTransferItem(resource))}
        listStyle={{
          width: 500,
          height: 300,
        }}
        targetKeys={state.targetKeys}
        onChange={handlerTransfer}
        render={renderItems}
      />
    );
  };

  const renderItems = (item: TransferItem) => {
    return (
      <span>
        {item.title} - {item.description}
      </span>
    );
  };

  //#endregion

  return (
    <Wrapper contentWrapper unselectable direction="row" vertical="top" horizontal="full-width">
      {renderResourcesPanel(resourcePanels)}
      {/*   {renderResourcesPanel(state.panels)} */}
    </Wrapper>
  );
};
