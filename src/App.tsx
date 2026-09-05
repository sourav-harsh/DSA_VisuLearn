import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { HomePage } from "@/pages/Home";
import { NotFoundPage } from "@/pages/NotFound";
import { SystemDesignIndexPage } from "@/pages/SystemDesign/Index";
import { SystemDesignSectionPage } from "@/pages/SystemDesign/Section";
import { TopicPage } from "@/pages/Topic";
import { TopicsPage } from "@/pages/Topics";
import { getSDSection } from "@/utils/systemdesign";
import { getTopic } from "@/utils/topics";
import { usePageMeta } from "@/utils/usePageMeta";

function TopicRoute() {
  const { slug = "" } = useParams();
  const topic = getTopic(slug);
  usePageMeta(
    topic ? `${topic.title} — Animated DSA Visualizer` : "Topic not found",
    topic?.blurb,
  );
  if (!topic) return <NotFoundPage />;
  return <TopicPage topic={topic} />;
}

function SystemDesignRoute() {
  const { slug = "" } = useParams();
  const section = getSDSection(slug);
  usePageMeta(
    section ? `${section.title} — Animated System Design` : "Section not found",
    section?.blurb,
  );
  if (!section) return <NotFoundPage />;
  return <SystemDesignSectionPage section={section} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/topic/:slug" element={<TopicRoute />} />
        <Route path="/system-design" element={<SystemDesignIndexPage />} />
        <Route path="/system-design/:slug" element={<SystemDesignRoute />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
