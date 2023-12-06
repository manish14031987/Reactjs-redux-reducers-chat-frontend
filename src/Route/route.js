// before login Routes
import Home from "../Pages/Home/Home";
import VerifyEmail from "../Pages/VerifyEmail";
import CmsPage from "../Pages/Cms";
import CmsPageMobile from "../Pages/Mobile";
import Faq from "../Pages/Faq";
import ContactUs from "../Pages/ContactUs";
import MyAccount from "../Pages/MyAccount";
import NotFound from "../Pages/NotFound";
import CreatePostPage from "../Pages/Post/CreatePost";
import ManagePostList from "../Pages/Post/ManagePostList";
import ManageAddressList from "../Pages/Address/ManageAddressList";
import AccountInfo from "../Pages/Sidebar/AccountInfo";
import PublicProfile from "../Pages/Sidebar/PublicProfile";
import TransactionHistory from "../Pages/Sidebar/TransactionHistory/TransactionHistory";
import CashOut from "../Pages/Sidebar/CashOut/CashOut";
import PaymentMethod from "../Pages/Sidebar/PaymentMethod/PaymentMethod";
import ArchiveList from "../Pages/Sidebar/ArchiveList/ArchiveList";
import OrderTracking from "../Pages/Sidebar/TransactionHistory/OrderTracking";
import Like from "../Pages/Sidebar/Like/Like";
import Manage from "../Pages/Sidebar/Manage/Manage";
import ProductDetail from "../Pages/Home/ProductDetail";
import BuyNow from "../Pages/Home/BuyNow";
import Purchase from "../Pages/Home/Purchase";
import ProductReview from "../Pages/Home/ProductReview";
import ThankYou from "../Pages/Home/ThankYou";
import Chat from "../Pages/Chat";
import subscriptionPurchase from "../Pages/Sidebar/Manage/subscriptionPurchase";
import subscriptionThank from "../Pages/Sidebar/Manage/subscriptionThanku";
import sellAnother from "../Pages/Sidebar/ArchiveList/sellAnother";
import MakeOffer from "../Pages/Home/MakeOffer";
import orderPayment from "../Pages/Chat/orderPayment";
import orderSuccess from "../Pages/Chat/orderSuccess";
import authorizeSuccess from "../Pages/Home/autorizeSuccess";
import ResetPass from "../Pages/Auth/PasswordReset";
import Notification from "../Pages/Notification";

export const RoutesPage = [
  { path: "/", component: Home, title: "Home" },
  {
    path: "/product/:productID",
    component: ProductDetail,
    title: "Product Details",
  },
  {
    path: "/auth/verify-email/:token",
    component: VerifyEmail,
    title: "Verify Email",
  },
  { path: "/about-us", component: CmsPage, title: "About Us" },
  { path: "/reset-password", component: ResetPass, title: "Reset Password" },
  
  { path: "/privacy-policy", component: CmsPage, title: "Privacy Policy" },
  {
    path: "/community-guidelines",
    component: CmsPage,
    title: "Community Guidelines",
  },
  { path: "/terms-services", component: CmsPage, title: "Terms of Services" },
  { path: "/post-ad", component: CmsPage, title: "Post & add" },
  { path: "/terms-condition", component: CmsPage, title: "Terms & Condition" },
  { path: "/faq", component: Faq, title: "Faq" },
  { path: "/contact-us", component: ContactUs, title: "Faq" },
  { path: "/my-account", component: MyAccount, title: "My Account" },
  { path: "/404", component: NotFound, title: "404" },
];

export const MobilePage = [
  { path: "/mobile/:slug", component: CmsPageMobile, title: "About Us" },
];

export const RoutesUser = [
  { path: "/buy-now/:id", component: BuyNow, title: "Buy Now" },
  { path: "/purchase", component: Purchase, title: "Purchase" },
  { path: "/thank-You/:id", component: ThankYou, title: "Thank You" },
  { path: "/order-payment", component: orderPayment, title: "Order Payment" },
  { path: "/order-success", component: orderSuccess, title: "Order Success" },
  {
    path: "/authorize-success",
    component: authorizeSuccess,
    title: "Authorize Success",
  },

  {
    path: "/subscription",
    component: subscriptionPurchase,
    title: "Subscription",
  },
  {
    path: "/subscription-thanku",
    component: subscriptionThank,
    title: "Subscription",
  },
  {
    path: "/sell-another/:id",
    component: sellAnother,
    title: "Sell Another",
  },

  {
    path: "/product-review/:id",
    component: ProductReview,
    title: "Product Review",
  },
  { path: "/create-post", component: CreatePostPage, title: "Create Post" },
  { path: "/edit-post/:id", component: CreatePostPage, title: "Edit Post" },
  {
    path: "/manage-post-list",
    component: ManagePostList,
    title: "Manage Post",
  },
  {
    path: "/manage-address",
    component: ManageAddressList,
    title: "Manage Address",
  },
  {
    path: "/account-info",
    component: AccountInfo,
    title: "Account Info",
  },
  {
    path: "/public-profile",
    component: PublicProfile,
    title: "Public Profile",
  },
  {
    path: "/transaction-history",
    component: TransactionHistory,
    title: "Transaction History",
  },
  {
    path: "/cash-out",
    component: CashOut,
    title: "Cash Out",
  },
  {
    path: "/payment-method",
    component: PaymentMethod,
    title: "Payment & Payout",
  },
  {
    path: "/manage-archive-list",
    component: ArchiveList,
    title: "Archive List",
  },
  {
    path: "/order-tacking/:id",
    component: OrderTracking,
    title: "Order Tracking",
  },
  {
    path: "/like",
    component: Like,
    title: "Like",
  },
  {
    path: "/manage",
    component: Manage,
    title: "Manage",
  },
  { path: "/chat/:roomId?", component: Chat, title: "Chat" },
  {
    path: "/makeOffer/:postId/:roomId?",
    component: MakeOffer,
    title: "Make Offer",
  },
  {
    path: "/notification",
    component: Notification,
    title: "Notification",
  },
];
