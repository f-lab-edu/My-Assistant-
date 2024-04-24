import { Dot } from '@/components/ui/dot';

export default function SignUi() {
  return (
    <>
      <div className="absolute right-0 top-0 pr-3 pt-3 text-white">
        <Dot />
      </div>
      <div className="relative z-30 flex flex-col justify-center pl-4 md:pl-24 md:pr-12 xl:pr-12">
        <h3 className="text-4xl font-extrabold leading-tight text-white">
          MyNote <br />
          Schedule &amp;
          <br />
          Issue Management
        </h3>
        <p className="hidden pt-3 text-xl leading-normal text-white sm:block xl:w-10/12">
          MyNote는 개인이 혼자 컨트롤하기 어려웠던 스케쥴 관리와 개인 프로젝트
          일정 관리를 해결하는데 도움을 주는 애플리케이션입니다.
        </p>
      </div>
      <div className="absolute bottom-0 left-0 z-20 pb-3 pl-3 text-white">
        <Dot />
      </div>
    </>
  );
}
