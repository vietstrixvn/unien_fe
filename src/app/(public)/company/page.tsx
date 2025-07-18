import { Container } from '@/components/wrappers/Container';
import { StatsSection } from '@/components/wrappers/StartSection';
import { SEO, HeroHeader, ContactComponent } from '@/components';
import { WhoAreWeSection } from '@/components/pages/company/about-us';
import CompanyPortfolio from '@/components/pages/company/more-info';
import OurProjects from '@/components/pages/company/our-project';
import React from 'react';

const Page = () => {
  return (
    <>
      <SEO
        title="Giới Thiệu Unien"
        description="Unien là đối tác đáng tin cậy trong lĩnh vực Lò Hơi Công Nghiệp, Tủ Điện và Giải Pháp Năng Lượng. Chúng tôi cam kết mang đến giá trị thật, dịch vụ tận tâm và giải pháp bền vững cho doanh nghiệp của bạn."
      />

      <main>
        <HeroHeader
          title="Chúng Tôi Là Unien"
          description="Với kinh nghiệm trong lĩnh vực điện – lò hơi – năng lượng tái tạo, chúng tôi không ngừng cải tiến để mang đến giải pháp kỹ thuật hiệu quả, tiết kiệm và bền vững cho khách hàng khắp cả nước."
        />

        <Container>
          <WhoAreWeSection />
        </Container>
        <StatsSection />
        <Container>
          <CompanyPortfolio />
          <OurProjects />
          <ContactComponent />
          <div className="h-[450px] w-full overflow-hidden border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2329.5873653111134!2d106.78562651421029!3d10.896470564846595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8ececefa8e7%3A0x3853d60278a7a2df!2zNjksIMSQw7RuZyBIw7JhLCBExKkgQW4sIELDrG5oIETGsMahbmcsIFZp4buHdCBOYW0!5e0!3m2!1svi!2sus!4v1751697886418!5m2!1svi!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </Container>
      </main>
    </>
  );
};

export default Page;
