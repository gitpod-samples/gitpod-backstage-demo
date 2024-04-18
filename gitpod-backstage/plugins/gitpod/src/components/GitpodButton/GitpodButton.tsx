import React from 'react';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Button, Typography, Link } from '@material-ui/core';
import { InfoCard } from '@backstage/core-components';
import { useGitpodUrl } from '../../hooks/useGitpodUrl';

export const GitpodButton = () => {
  const { entity } = useEntity();
  const gitpodBaseUrl = useGitpodUrl();

  // Mapping repository hosts to their URL structures
  const repoHosts = {
    'github.com/project-slug': 'https://github.com/',
    'gitlab.com/project-slug': 'https://gitlab.com/',
    'bitbucket.org/project-slug': 'https://bitbucket.org/',
  };

  // Finding the first matching repository host and constructing the Gitpod URL
  const repoUrlKey = Object.keys(repoHosts).find(key => entity.metadata.annotations?.[key]);
  const repoBaseUrl = repoHosts[repoUrlKey];
  const repoSlug = entity.metadata.annotations?.[repoUrlKey];
  const gitpodUrl = repoSlug ? `${gitpodBaseUrl}#${repoBaseUrl}${repoSlug}` : '';

  return (
    <InfoCard title="Gitpod">
      <Typography variant="body2" gutterBottom>
        Quickly set up your development environment with 
        <strong>
          <a href={gitpodUrl} target="_blank" rel="noopener noreferrer">Gitpod</a>.
        </strong>
      </Typography>
      <Button
        variant="contained"
        color="primary"
        href={gitpodUrl}
        target="_blank"
        disabled={!repoSlug} // Use repoSlug for disabling the button
      >
        Open in Gitpod
      </Button>
      {!repoSlug && (
        <Typography variant="body2" color="error" style={{ marginTop: '16px' }}>
          You must configure a repository URL in your catalog file for this plugin to work.
          <Link href="https://www.gitpod.io/docs/integrations/internal-developer-portals" target="_blank" rel="noopener noreferrer">
            Read docs
          </Link>.
        </Typography>
      )}
    </InfoCard>
  );
};
