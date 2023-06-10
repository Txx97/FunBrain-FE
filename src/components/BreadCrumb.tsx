import { useRouter } from "next/router";
import React from "react";

export const BreadCrumb = (props) => {
  const router = useRouter();
  const { classId, subjectId, chapterId } = router.query;
  return (
    <div className="container-fluid">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li
            className={classId ? "breadcrumb-item" : "breadcrumb-item active"}
          >
            {classId || router.asPath.includes('quiz') ? (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/");
                }}
              >
                Classes
              </a>
            ) : (
              <>Classes</>
            )}
          </li>
          {classId ? (
            <li
              className={
                subjectId ? "breadcrumb-item" : "breadcrumb-item active"
              }
            >
              {classId && subjectId ? (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    router.replace(`/subjects/${classId}`);
                  }}
                >
                  Subjects
                </a>
              ) : (
                <>Subjects</>
              )}
            </li>
          ) : (
            <></>
          )}
          {subjectId ? (
            <li
              className={
                chapterId ? "breadcrumb-item" : "breadcrumb-item active"
              }
            >
              {classId && subjectId && chapterId ? (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    router.replace(
                      `/subjects/${classId}/chapters/${subjectId}`
                    );
                  }}
                >
                  Chapters
                </a>
              ) : (
                <>Chapters</>
              )}
            </li>
          ) : (
            <></>
          )}
          {classId && subjectId && chapterId ? (
            <li className="breadcrumb-item active">Content</li>
          ) : (
            <></>
          )}
          {chapterId && router.asPath.includes('quiz') ? (
            <li className="breadcrumb-item active">Quiz</li>
          ) : (
            <></>
          )}
        </ol>
      </nav>
    </div>
  );
};
