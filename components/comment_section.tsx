"use client";

import { useScript } from "@/hooks/useScript";
import * as React from "react";

export function CommentSection(props: {
  attrs: {
    pageId: string;
    pageTitle?: string;
    pageUrl?: string;
  };
}) {
  const divRef = React.useRef<HTMLDivElement>(null);

  const host = "https://cusdis.com";

  useScript(`${host}/js/cusdis.es.js`);

  React.useLayoutEffect(() => {
    // @ts-expect-error cusdis is not typed
    const render = window.renderCusdis;

    if (render) {
      render(divRef.current);
    }
  }, [props.attrs.pageId, props.attrs.pageTitle, props.attrs.pageUrl]);

  return (
    <div className="container mx-auto px-4  rounded-2xl p-4">
      <div
        id="cusdis_thread"
        data-host={host}
        data-page-id={props.attrs.pageId}
        data-app-id={process.env.NEXT_PUBLIC_CUSDIS_APP_ID}
        data-page-title={props.attrs.pageTitle}
        data-page-url={props.attrs.pageUrl}
        ref={divRef}
      ></div>
    </div>
  );
}

// const CommentSection = ({
//   page,
//   transformedPage,
// }: {
//   page: PageObjectResponse;
//   transformedPage: TransformedPage;
// }) => {
//   return (
//     <div className="container mx-auto px-4 bg-white rounded-2xl p-4">
//       <div
//         id="cusdis_thread"
//         data-host="https://cusdis.com"
//         data-app-id="a73a6687-88e6-4917-9552-b4ce6d437424"
//         data-page-id={page.id}
//         data-page-url={`${process.env.NEXT_PUBLIC_APP_URL}/p/${transformedPage.slug}`}
//         data-page-title={transformedPage.title}
//         className="h-[500px]"
//       ></div>
//       <script async defer src="https://cusdis.com/js/cusdis.es.js" />
//     </div>
//   );
// };

// export default CommentSection;
