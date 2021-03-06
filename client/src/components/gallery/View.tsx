import React from "react";
import styled from "styled-components";

// Communication stuff
// import axios from 'axios';
// import NextLink from "next/link";
// import NextRouter from "next/router";
// import { useRouter } from "next/router";

// Material-ui stuff
// import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
// import PersonIcon from "@material-ui/icons/Person";

// Redux stuff
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";

// Components
import Button from "atoms/Button";
import ViewComment from "./ViewComment";
import ViewLikeBox from "./ViewLikeBox";
import { Block, SignalWifi1BarLock } from "@material-ui/icons";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

export default function fun(props) {
  const { postData } = props.preProps;

  React.useEffect(() => {
    console.log(`rendered`);
    // console.log({ postData: postData });
  });

  return (
    <Wrapper>
      {postData.status !== `disabled` ? (
        <>
          <ViewHeader>
            <HeaderTitle>
              <h3>{postData.title}</h3>
            </HeaderTitle>
            <HeaderDetails>
              <div className="left">
                {postData.donor}
                <hr className="vr"></hr>
                {postData.created_at}
              </div>
              <div className="right">
                조회 {postData.view_cnt}
                <hr className="vr"></hr>
                추천 {postData.like_cnt}
                <hr className="vr"></hr>
                댓글 {postData.comment_cnt}
              </div>
            </HeaderDetails>
          </ViewHeader>
          <ViewBody>{postData.body}</ViewBody>
          <ViewLikeBox preProps={props.preProps}></ViewLikeBox>
          <ViewFooter>
            <div className="Left"></div>
            <div className="Right">
              <Button>削除</Button>
            </div>
          </ViewFooter>
          <ViewComment preProps={props.preProps}></ViewComment>
        </>
      ) : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  padding: 0 0.5rem;
`;

const ViewHeader = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const HeaderTitle = styled.div``;

const HeaderDetails = styled.div`
  display: flex;
  margin: 0 5px;
  justify-content: space-between;
`;

const ViewBody = styled.div`
  white-space: pre-wrap;
`;

const ViewFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;
