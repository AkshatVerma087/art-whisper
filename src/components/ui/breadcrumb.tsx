import React from 'react';
import { Button } from './ConsolidatedUI';

const Breadcrumb = () => {
  return (
    <nav>
      <Button>Home</Button>
      <span> / </span>
      <Button>Current Page</Button>
    </nav>
  );
};

export default Breadcrumb;
