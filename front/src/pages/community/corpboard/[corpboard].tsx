import axios from "axios";
import { Context, useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import QuickMenu from "@/components/QuickMenu";
import BoardNavBar from "@/components/community/BoardNavBar";
import { SERVER_URL } from "@/utils/url";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

export default function CorpBoardAll({ data }: { data: any }) {
  const router = useRouter();
  const [page, setPage] = useState<Array<number>>([]);
  const [prevPage, setPrevPage] = useState<string>("");
  const [nextPage, setNextPage] = useState<string>("");

  useEffect(() => {
    if (typeof router.query.corpboard === "string") {
      const temp = parseInt(router.query.corpboard);
      if (temp === 1) {
        setPrevPage((1).toString());
      } else {
        setPrevPage((temp - 1).toString());
      }

      if (temp === data.totalPage) {
        setNextPage(data.totalPage.toString());
      } else {
        setNextPage((temp + 1).toString());
      }
      if (temp <= 9) {
        const tempArr = [];
        for (var i = 1; i < 10; i++) {
          if (i > data.totalPage) {
            break;
          }
          tempArr.push(i);
        }
        setPage(tempArr);
      } else {
        const minPage = temp - (temp % 10);
        const tempArr: any = [];
        for (var i = minPage; i < minPage + 10; i++) {
          if (i > data.totalPage) {
            break;
          }
          tempArr.push(i);
        }
        console.log(tempArr);
        setPage(tempArr);
      }
    }
  }, [router]);

  return (
    <>
      <NavBar />
      <QuickMenu />
      <BoardNavBar />
      <div className="flex flex-col whitespace-nowrap w-[1200px] mx-auto">
        <div className="flex font-bold py-10 border-b-1 border-gray-300">
          <div className="text-center w-70">번호</div>
          <div className="text-center w-[550px]">제목</div>
          <div className="text-center w-[200px]">닉네임</div>
          <div className="text-center w-100">추천</div>
          <div className="text-center w-100">조회</div>
          <div className="text-center w-[180px]">작성일</div>
        </div>
      </div>
      <div className="flex w-[1200px] mx-auto border-b-1 border-gray-300">
        <div className="flex flex-col">
          {data.data &&
            data.data.map((post: any) => (
              <div className="flex py-10">
                <div className="text-center w-70">{post.communityId}</div>
                <div className="w-[550px] line-clamp-1">
                  {`${post.title}` + "  "}
                  <span className="text-brand font-bold">
                    [{post.commentCount}]
                  </span>
                </div>
                <div className="text-center w-[200px]">{post.userName}</div>
                <div className="text-center w-100">{post.likesCount}</div>
                <div className="text-center w-100">{post.viewCount}</div>
                <div className="text-center w-[180px]">{post.date}</div>
              </div>
            ))}
        </div>
      </div>
      <div className="flex justify-center items-center my-30">
        <Link href={"/community/corpboard/" + `${prevPage}`}>
          <Image
            src="/prev_page.png"
            alt="이전페이지"
            width={52}
            height={64}
            className="w-26 h-32 mx-20"
          />
        </Link>
        {page.map((page) => (
          <Link
            href={"/community/corpboard/" + `${page}`}
            key={"corpAll" + `${page}`}
          >
            <div
              className={
                "mx-20 " +
                `${
                  router.query.corpboard &&
                  typeof router.query.corpboard === "string" &&
                  parseInt(router.query.corpboard) === page
                    ? "font-bold text-24"
                    : null
                }`
              }
            >
              {page}
            </div>
          </Link>
        ))}
        <Link href={"/community/corpboard/" + `${nextPage}`}>
          <Image
            src="/next_page.png"
            alt="이전페이지"
            width={52}
            height={64}
            className="w-26 h-32 mx-20"
          />
        </Link>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { data } = await axios.get(SERVER_URL + `/community/corp`, {
    params: {
      page: context.query.corpboard - 1,
      size: 10,
      sort: "all",
    },
  });
  return {
    props: {
      data,
    },
  };
}
