import {IconButton, Menu, MenuItem} from "@material-ui/core";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React from "react";
import {useMutation} from "@apollo/react-hooks";
import {gql} from "apollo-boost";

export const REMOVE_FINANCIAL_CONTRACT = gql`
mutation RemoveFinancialContract($id: String!) {
	removeFinancialContract(id: $id) {
		success
		message
	}
}
`;

interface ListItemMenuProps {
  id: string;
  removeResume: (id: string) => void
}

const ListItemMenu: React.FC<ListItemMenuProps> = (props) => {
  const [ removeFinancialContract ] = useMutation(REMOVE_FINANCIAL_CONTRACT);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemoveContract = () => {
    removeFinancialContract({ variables: { id: props.id } })
    	.then(_ => {
        props.removeResume(props.id);
    	})
    	.catch(_ => alert("We are sorry, but something went wrong. :( Try again later."))
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
      <MenuItem onClick={handleRemoveContract}>Remove</MenuItem>
      </Menu>
    </div>
  );
};

export default ListItemMenu;