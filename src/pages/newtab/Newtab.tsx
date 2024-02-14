// import { AccountStatus } from 'chrome';

import React, { useEffect } from 'react';
// import logo from '@assets/img/logo.svg';
// import '@pages/newtab/Newtab.css';
// import '@pages/newtab/Newtab.scss';
import useStorage from '@src/shared/hooks/useStorage';
import exampleThemeStorage from '@src/shared/storages/exampleThemeStorage';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';

// TODO: figure out type for this
// eslint-disable-next-line react/prop-types
const Column = ({ children }) => (
  <div
    style={{
      // border: '1px solid red',
      display: 'flex',
      flexDirection: 'column',
      flexBasis: '100%',
      flex: '1',
    }}>
    {children}
  </div>
);

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
      name: 'campaign-by-utm_campaign',
      link: 'https://blazer.instacart.tools/blazer/queries/321805-campaign-by-utm_campaign?utm_campaign=pharmasave_instore_directlink_V3-Q4-2023',
    },
    {
      name: 'taas-segment-by-id',
      link: 'https://blazer.instacart.tools/blazer/queries/321536-taas-segment-by-id?segment_id=1f4218d4-37a4-4cc9-be33-a2fb4f4e9d82',
    },
    {
      name: 'campaign-by-id',
      link: 'https://blazer.instacart.tools/blazer/queries/321807-campaign-by-id?campaign_id=12288488746005124',
    },
    {
      name: 'canada-campaigns-that-are-active',
      link: 'https://blazer.instacart.tools/blazer/queries/323056-canada-campaigns-that-are-active',
    },
    {
      name: 'campaign-discount-policy-check',
      link: 'https://blazer.instacart.tools/blazer/queries/323093-campaign-discount-policy-check?campaign_id=12961253118009328',
    },
    {
      name: 'ipp-find-users-by-email-w-role (defaults to you)',
      link: `https://blazer.instacart.tools/blazer/queries/316550-ipp-find-users-by-email-w-role?email=${decodeURIComponent(userProfile.email ?? '')}`,
    },
  ];

  const links = [
    {
      name: 'V4/CampaignsDomain Github',
      link: 'https://github.com/instacart/carrot/blob/master/customers/customers-backend/domains/campaigns_domain/',
    },
    {
      name: 'V4/CampaignsOrchestrator Github',
      link: 'https://github.com/instacart/carrot/blob/master/customers/customers-backend/layers/orchestration_layer/orchestrators/retailer_campaign_orchestrators/',
    },
    {
      name: 'CampaignsDomain Proto Github',
      link: 'https://github.com/instacart/carrot/blob/master/shared/protos/instacart/customers/campaigns/v1/campaigns_service.proto',
    },
    {
      name: 'CampaignsOrchestrator Proto Github',
      link: 'https://github.com/instacart/carrot/blob/master/shared/protos/instacart/customers/coupons/v1/retailer_campaign.proto',
    },
    {
      name: 'Sprint Retro Board (FigJam)',
      link: 'https://www.figma.com/file/3WFi9v1BsswNutjM4Wz6jv/GS-Tooling-Retro?type=whiteboard&node-id=126-1512&t=SDORWcovyVF9q1EP-0',
    },
    { name: 'ICMS Mode Dashboard', link: 'https://app.mode.com/instacart/reports/6fcca1b7f57d' },
    { name: 'GT Chrome Extension GitHub', link: 'https://github.com/kamikaz1k/ic-gt-team' },
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
              <li>
                <a href="https://blazer.instacart.tools/blazer/">Blazer</a>
                <ul>
                  {blazerLinks.map(link => (
                    <li key={link.name}>
                      <a href={link.link}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </li>
              {links.map(link => (
                <li key={link.name}>
                  <a href={link.link}>{link.name}</a>
                </li>
              ))}
              <li>
                <a href="https://github.com/orgs/instacart/teams/campaign-tooling">GT PRs on Carrot</a>
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
            <h2>Most Visited (from Chrome)</h2>
            <ul
              style={{
                listStyle: 'square',
              }}>
              {mostVisited.map(site => (
                <li key={site.url}>
                  <a href={site.url}>{site.title}</a>
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
