import { Tab, TabContent, TabItem } from "./components/tab";

export default function App() {
  return (
    <>
      <Tab>
        <div className="flex gap-4">
          <TabItem id="tab1">Tab1</TabItem>
          <TabItem active id="tab2">
            Tab2
          </TabItem>
          <TabItem id="tab3">Tab3</TabItem>
        </div>

        <div>
          <TabContent id="tab1">Tab1 Content</TabContent>
          <TabContent id="tab2">Tab2 Content</TabContent>
          <TabContent id="tab3">Tab3 Content</TabContent>
        </div>
      </Tab>
    </>
  );
}
