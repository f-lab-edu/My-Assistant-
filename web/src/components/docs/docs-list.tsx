import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type DocsListType = {
  id: string;
  title: string;
  icon: JSX.Element;
};

export default function DocsList({ id, title, icon }: DocsListType) {
  return (
    <div className="mb-4">
      <Accordion type="single" collapsible>
        <AccordionItem value={id}>
          <AccordionTrigger>
            <div className="flex items-center gap-4">
              {icon} {title}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex cursor-pointer flex-col gap-4 pl-8">
              <div># title - desc1234</div>
              <div># title - desc1234</div>
              <div># title - desc1234</div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
