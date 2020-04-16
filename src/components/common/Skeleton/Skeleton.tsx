import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { TopNav } from "../TopNav/TopNav";
import { Grid } from "@material-ui/core";

const Skeleton: React.FC<RouteComponentProps> = ({
   children,
 }: any) => {
  return (
    <div>
      <Grid
        container
        direction="column-reverse"
        justify="center"
        alignItems="stretch"
          >
          <Grid item>
            <TopNav />
          </Grid>

          <Grid item style={{
            marginTop: "76px",
            textAlign: 'center',
          }}>
            {children}
          </Grid>
      </Grid>
    </div>
  );
};

export default Skeleton;