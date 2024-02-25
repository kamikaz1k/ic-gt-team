import React, { useEffect } from 'react';
// import logo from '@assets/img/logo.svg';
// import '@pages/newtab/Newtab.css';
// import '@pages/newtab/Newtab.scss';
import useStorage from '@src/shared/hooks/useStorage';
import exampleThemeStorage from '@src/shared/storages/exampleThemeStorage';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';

// TODO: figure out type for this
const Column = ({ children }: { children?: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      flexBasis: '100%',
      flex: '1',
    }}>
    {children}
  </div>
);

const FallbackFavicon = ({ url, size = 16 }: { url: string; size?: number }) => {
  const urlObj = new URL(url);
  const fallback = `https://www.google.com/s2/favicons?sz=${size}&domain=${urlObj.origin}`;
  return (
    <img
      height={size}
      width={size}
      onError={e => {
        (e.target as HTMLImageElement).src = fallback;
      }}
      src={`${urlObj.origin}/favicon.ico`}
      alt="favicon"
    />
  );
};

type LinkTileProps = {
  title: string;
  url: string;
};

const LinkTile = ({ title, url }: LinkTileProps) => {
  const isInstacart = url.includes('instacart') || url.includes('fernet') || url.includes('isc');
  const urlObj = new URL(url);
  const src = url.includes('instacart')
    ? 'https://www.instacart.com/favicon.ico'
    : 'https://www.google.com/s2/favicons?sz=64&domain=' + urlObj.origin;

  const name = isInstacart || url.includes('google.') ? urlObj.hostname.split('.')[0] : title;
  return (
    <a
      href={url}
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', width: 76, textAlign: 'center' }}>
      <figure style={{ width: '100%', height: 76, margin: '0 auto' }}>
        <img style={{ width: '100%' }} src={src} alt="favicon" />
      </figure>
      <div>{name.length > 10 ? name.slice(0, 10) + '...' : name}</div>
    </a>
  );
};

const Newtab = () => {
  const [mostVisited, setMostVisited] = React.useState([]);
  const [userProfile, setUserProfile] = React.useState({ email: '' });
  useEffect(() => {
    chrome.topSites.get(mostVisited => {
      setMostVisited(mostVisited);
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    chrome.identity.getProfileUserInfo({ accountStatus: 'ANY' as any }, setUserProfile);
  }, []);

  const theme = useStorage(exampleThemeStorage);
  const blazerLinks = [
    {
      title: 'campaign-by-utm_campaign',
      url: 'https://blazer.instacart.tools/blazer/queries/321805-campaign-by-utm_campaign?utm_campaign=', //pharmasave_instore_directlink_V3-Q4-2023',
    },
    {
      title: 'taas-segment-by-id',
      url: 'https://blazer.instacart.tools/blazer/queries/321536-taas-segment-by-id?segment_id=', //1f4218d4-37a4-4cc9-be33-a2fb4f4e9d82',
    },
    {
      title: 'campaign-by-id',
      url: 'https://blazer.instacart.tools/blazer/queries/321807-campaign-by-id?campaign_id=', //12288488746005124',
    },
    {
      title: 'canada-campaigns-that-are-active',
      url: 'https://blazer.instacart.tools/blazer/queries/323056-canada-campaigns-that-are-active',
    },
    {
      title: 'campaign-discount-policy-check',
      url: 'https://blazer.instacart.tools/blazer/queries/323093-campaign-discount-policy-check?campaign_id=', //12961253118009328',
    },
    {
      title: 'ipp-find-users-by-email-w-role (defaults to you)',
      url: `https://blazer.instacart.tools/blazer/queries/316550-ipp-find-users-by-email-w-role?email=${decodeURIComponent(userProfile.email ?? '')}`,
    },
  ];

  const links = [
    {
      title: 'Campaign Templates IPP/Garden',
      url: 'https://dashboard.instacart.com/partners/289/warehouses/1000/retailer-funded-marketing/sites/1177/campaign-templates',
    },
    {
      title: 'Roulette',
      url: 'https://roulette.instacart.tools/roulette/production/',
    },
    {
      title: 'V4/CampaignsDomain Github',
      url: 'https://github.com/instacart/carrot/blob/master/customers/customers-backend/domains/campaigns_domain/',
    },
    {
      title: 'V4/CampaignsOrchestrator Github',
      url: 'https://github.com/instacart/carrot/blob/master/customers/customers-backend/layers/orchestration_layer/orchestrators/retailer_campaign_orchestrators/',
    },
    {
      title: 'CampaignsDomain Proto Github',
      url: 'https://github.com/instacart/carrot/blob/master/shared/protos/instacart/customers/campaigns/v1/campaigns_service.proto',
    },
    {
      title: 'CampaignsOrchestrator Proto Github',
      url: 'https://github.com/instacart/carrot/blob/master/shared/protos/instacart/customers/coupons/v1/retailer_campaign.proto',
    },
    {
      title: 'Sprint Retro Board (FigJam)',
      url: 'https://www.figma.com/file/3WFi9v1BsswNutjM4Wz6jv/GS-Tooling-Retro?type=whiteboard&node-id=126-1512&t=SDORWcovyVF9q1EP-0',
    },
    { title: 'ICMS Mode Dashboard', url: 'https://app.mode.com/instacart/reports/6fcca1b7f57d' },
    { title: 'GT Chrome Extension GitHub', url: 'https://github.com/kamikaz1k/ic-gt-team' },
  ];

  const team = [
    { username: '@BhavyaShahi', name: 'Bhavya Shahi' },
    { username: '@cheninstacart', name: 'Chen Liu' },
    { username: '@christopher-shum', name: 'Christopher Shum' },
    { username: '@wongopher', name: 'Chris Wong' },
    { username: '@ryanmicku', name: 'Ryan McColeman' },
    { username: '@sunnyfz309', name: 'Sunny Feng' },
    { username: '@kamikaz1k', name: 'Kaiser Dandangi' },
    { username: '@zeroc', name: 'Max Gu' },
    { username: '@schybo', name: 'Brent Scheibelhut' },
    { username: '@picklechips', name: 'Ryan Martin' },
    { username: '@shaunmaharaj', name: 'Shaun Maharaj' },
  ];

  const teamPrs = team.map(member => ({
    name: member.name,
    link: `https://github.com/instacart/carrot/pulls/${member.username}`,
  }));

  return (
    <div
      style={{
        // backgroundColor: theme === 'light' ? '#ffffff' : '#000000',
        fontSize: '1.1rem',
      }}>
      <h1>Welcome to GT NewTab</h1>

      <div>
        <h2>Most Visited (from Chrome)</h2>
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'row',
            paddingInlineStart: 0,
            maxWidth: '100%',
            gap: 18,
            overflow: 'auto',
          }}>
          {mostVisited.map(site => (
            <li
              key={site.url}
              style={{
                paddingBottom: 20,
                width: 100,
                display: 'flex',
                justifyContent: 'center',
              }}>
              <LinkTile {...site} />
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          // backgroundColor: theme === 'light' ? '#ffffff' : '#000000',
          fontSize: '1.1rem',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: '100%',
        }}>
        <Column>
          <div>
            <h2>Team Links</h2>
            <ul
              style={{
                listStyle: 'square',
              }}>
              {links.map(link => (
                <li key={link.title}>
                  <a href={link.url}>
                    <FallbackFavicon url={link.url} />
                    <span style={{ paddingLeft: 8 }}>{link.title}</span>
                  </a>
                </li>
              ))}
              <li>
                <a href="https://github.com/orgs/instacart/teams/campaign-tooling">
                  <FallbackFavicon url={'https://github.com'} />
                  <span style={{ paddingLeft: 8 }}>GT PRs on Carrot</span>
                </a>
                <ul>
                  {teamPrs.map(pr => (
                    <li key={pr.name}>
                      <a href={pr.link}>{pr.name}</a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </Column>
        <Column>
          <div>
            <h2>
              <a href="https://blazer.instacart.tools/blazer/">Blazer</a>
            </h2>
            <ul>
              {blazerLinks.map(link => (
                <li key={link.title}>
                  <a href={link.url}>{link.title}</a>
                  {link.url.endsWith('=') && (
                    <input
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          window.location.href = `${link.url} = ${(e.target as HTMLInputElement).value?.trim()}`;
                        }
                      }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Column>
      </div>
      <header className="App-header" style={{ color: theme === 'light' ? '#000' : '#fff' }}>
        <p>
          Edit <code>src/pages/newtab/Newtab.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Newtab, <div> Loading ... </div>), <div> Error Occur </div>);
