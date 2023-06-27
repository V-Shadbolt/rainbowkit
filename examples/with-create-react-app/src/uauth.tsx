import { Chain, Wallet } from '@rainbow-me/rainbowkit';
import { default as UAuth } from '@uauth/js';
import { UAuthWagmiConnector } from '@uauth/wagmi';
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask';
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect';
import { Connector } from 'wagmi';

export interface UauthOptions {
  projectId: string;
  chains: Chain[];
  clientID: string;
  redirectUri: string;
  scope?: string;
}

export const uauth = ({
  projectId,
  chains,
  clientID,
  redirectUri,
  scope,
}: UauthOptions): Wallet => {
  const uauthClient = new UAuth({
    clientID: clientID,
    redirectUri: redirectUri,
    scope: scope || 'openid wallet',
  });

  const metaMaskConnector = new MetaMaskConnector();

  const walletConnectConnector = new WalletConnectConnector({
    options: {
      projectId: projectId,
    },
  });

  const uauthConnector = new UAuthWagmiConnector({
    chains: chains,
    options: {
      uauth: uauthClient,
      metaMaskConnector,
      walletConnectConnector,
    },
  });

  return {
    id: 'Unstoppable Domains',
    name: 'Unstoppable Domains',
    iconUrl: '/ud.png',
    iconBackground: '#ffffff',
    createConnector: () => {
      const connector = uauthConnector as any as Connector<any, any>;

      return {
        connector,
      };
    },
  };
};
