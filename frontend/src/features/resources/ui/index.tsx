import { Empty, Skeleton, Tabs, Transfer } from 'antd';
import { TransferDirection, TransferItem } from 'antd/lib/transfer';
import React, { Key, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/store/store.hooks';
import { Loading } from 'src/components/loading';
import { Wrapper } from 'src/components/wrapper';
import { Texts } from 'src/constants/texts';
import { FetchAssetsDto } from 'src/features/resources/assets/data/dto';
import { Message } from 'src/helpers/message.helper';
import { Asset } from '../assets/data/types';
import { setAssets } from '../assets/logic';
import { setLicenses } from '../licenses/logic';
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
  const developers = useAppSelector((s) => s.developers);
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
  /* 
  useEffect(() => {
    console.log('aaaaa');
  }, []);

  useEffect(() => {
    setResources();
    console.log('bbb');
  }, [state.currentPanel]);
 */
  useEffect(() => {
    console.log(currentDeveloper, assets.data.assetsByDeveloper, `${currentDeveloper && assets.data.assetsByDeveloper}`);
    if (currentDeveloper && assets.data.assetsByDeveloper) {
      setResources();
      //    console.log('cccc');
    }
  }, [assets.data.assetsByDeveloper]);

  useEffect(() => {
    if (currentDeveloper && licenses.data.licensesByDeveloper) {
      setResources();
      //  console.log('dddd');
    }
  }, [licenses.data.licensesByDeveloper]);

  /*   useEffect(() => {
    //const assigned = developers.data.setDeveloperStatus?.response?.mappedData
    setState((s) => ({ ...s, targetKeys: [] }));
 
  }, [developers.data.setDeveloperStatus?.response?.mappedData]);
 */
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

    if (state.currentPanel === resourcePanels[0].key) result = await dispatch(setAssets({ body, placeholders }));
    else result = await dispatch(setLicenses({ body, placeholders }));

    if (setAssets.rejected.match(result) || setLicenses.rejected.match(result)) {
      Message.error(Texts.DEVELOPER_RESOURCE_ERROR);
    }
  };

  //#endregion

  //#region Other functions

  const setResources = () => {
    const resourcesByDeveloper =
      state.currentPanel === resourcePanels[0].key
        ? (assets.data.assetsByDeveloper! ?? {})[currentDeveloper]
        : (licenses.data.licensesByDeveloper! ?? {})[currentDeveloper];

    // if (!resourcesByDeveloper || resourcesByDeveloper.length === 0) return;

    setState((s) => ({
      ...s,
      targetKeys: resourcesByDeveloper?.map((res) => `${res.key}`),
    }));
  };

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
      <Wrapper contentWrapper direction="row" horizontal="center">
        {assets.data.fetchAssetsByDeveloper?.loading || licenses.data.fetchLicensesByDeveloper?.loading ? (
          <Loading />
        ) : (
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
        )}
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
      <span key={item.key}>
        {item.title} - {item.description}
      </span>
    );
  };

  //#endregion

  return renderResourcesPanel(resourcePanels);
};
