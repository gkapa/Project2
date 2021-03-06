import React from "react";
import styled from "styled-components";

// Communication stuff
import axios from "axios";
// import NextLink from "next/link";
import NextRouter from "next/router";
import { useRouter } from "next/router";

// Material-ui stuff
// import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
// import PersonIcon from "@material-ui/icons/Person";

// Redux stuff
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "store";
import { shallowEqual } from "react-redux";
import { uiAction } from "store";

// Components
import Button from "atoms/Button";
import Write from "components/gallery/Write";

import { colors } from "styles/theme";

// interface Props {}

const WriteHeaderContents = {
  common: "一般",
  info: "情報",
};

export default function fun(props) {
  // const nextRouter = useRouter();

  const refs = {
    writeTitle: React.useRef<any>(""),
    writeBody: React.useRef<any>(""),
  };

  const { isAuthenticated, isLoading } = {
    isAuthenticated: useSelector(
      (x: RootState) => x.userReducer.isAuthenticated,
      shallowEqual,
    ),
    isLoading: useSelector((x: RootState) => x.uiReducer.isHi, shallowEqual),
  };

  const [currentHeader, setCurrentHeader] = React.useState("common");

  React.useEffect(() => {
    // if (!isAuthenticated) {
    //   alert("書き込みにはログインが必要です。");
    //   NextRouter.push("/join/signin");
    // }
  }, [isAuthenticated]);

  const dispatch = useDispatch();
  // const nextRouter = useRouter();

  const handleOnClickHeaderContent = React.useCallback(async (el) => {
    setCurrentHeader(el);
  }, []);

  const handleOnClickGoBack = React.useCallback(() => {
    NextRouter.push(`/gallery/list?page=1`);
  }, []);

  const handleOnClickSubmit = React.useCallback(async () => {
    try {
      dispatch(uiAction.hi());

      const userDetailsQry = await axios.post("/api/users/getuserdetails");

      const reqData = {
        category: currentHeader,
        title: refs.writeTitle.current.value,
        body: refs.writeBody.current.value,
        donor: userDetailsQry.data.uid,
      };

      await axios.post("/api/posts/addpost", {
        ...reqData,
      });

      NextRouter.push(`/gallery/list?page=1`);
    } catch (err) {
      console.error(err);
      let errors: any = {};
      const res = err.response.data;

      if (res.title)
        errors.title =
          "タイトルの内容は2以上、40以下の文字で入力してください。";
      if (res.body)
        errors.body = "本文の内容は2以上、2000以下の文字で入力してください";

      let msg = "エラー: \n";
      if (Object.keys(errors)) {
        for (const x of Object.values(errors)) {
          msg += x + "\n";
        }
      } else {
        msg += "未知のエラーが発生しました。\n";
      }
      alert(msg);
    } finally {
      dispatch(uiAction.lo());
    }
  }, [currentHeader]);

  return (
    <Wrapper>
      <WriteHeader>
        <div className="category-head">分類</div>
        {Object.entries(WriteHeaderContents).map((el) => {
          return (
            <Button
              key={el[0]}
              borderRadius="none"
              shadow="none"
              color="none"
              onClick={() => handleOnClickHeaderContent(el[0])}
              bg={currentHeader === el[0] ? colors.amber[2] : "transparent"}>
              {el[1]}
            </Button>
          );
        })}
      </WriteHeader>
      <WriteBody>
        <input
          className="write-title"
          type="text"
          placeholder="タイトルを入力してください"
          ref={refs.writeTitle}></input>
        <textarea
          className="write-body"
          placeholder="内容を入力してください"
          ref={refs.writeBody}></textarea>
      </WriteBody>
      <WriteFooter>
        <div className="area-left"></div>
        <div className="area-right">
          <Button onClick={() => handleOnClickGoBack()}>戻る</Button>
          <Button onClick={() => handleOnClickSubmit()} disabled={isLoading}>
            Write
          </Button>
        </div>
      </WriteFooter>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 0 auto;
`;

const WriteHeader = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${colors.border.main};
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

  & > .category-head {
    margin: 0;
    padding: 0.5rem 1rem;
    border-right: 1px solid ${colors.border.main};
    background-color: ${colors.gray[4]};
  }
`;

const WriteBody = styled.div`
  width: 100%;

  & .write-title {
    width: 100%;
    border: 3px solid green;
    height: 2rem;
  }

  & .write-body {
    width: 100%;
    border: 3px solid red;
    margin-top: 0.5rem;
    height: 20rem;
  }
`;

const WriteFooter = styled.div`
  display: flex;
  justify-content: space-between;

  & .area-right {
    display: flex;
  }
`;
