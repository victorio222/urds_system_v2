// import React from "react";

// interface CustomSkeletonProps {
//     children: React.ReactNode;
// }

// const CustomSkeleton: React.FC<CustomSkeletonProps> = ({ children }) => {
//   return (
//     <div className="skeletonWrapper">
//       {/* {children} */}
//       <div className="skeletonImage skeletonBase" />
//       <div className="skeletonText skeletonBase" />
//       <div className="skeletonText skeletonBase" />
//       <div className="skeletonButton skeletonBase" />
//     </div>
//   );
// };

// export default CustomSkeleton;









// export default function CustomSkeleton() {
//   return (
//     <div className="skeleton-wrapper">
//       <div className="header-bar skeleton" />
//       <div className="featured skeleton" />

//       {[1, 2, 3, 4].map((_, idx) => (
//         <div key={idx} className="list-item">
//           <div className="avatar skeleton" />
//           <div style={{ flex: 1 }}>
//             <div className="line line-short skeleton" />
//             <div className="line line-long skeleton" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }






export default function CustomSkeleton({ type = 'card', count = 1 }) {
    const renderSkeleton = () => {
        switch (type) {
            case 'list':
                return [...Array(count)].map((_, idx) => (
                    <div key={idx} className="list-item">
                        <div className="avatar skeleton" />
                        <div style={{ flex: 1 }}>
                            <div className="line line-short skeleton" />
                            <div className="line line-long skeleton" />
                        </div>
                    </div>
                ));
            case 'chart':
                return (
                    <div style={{ height: 'auto', width: '100%' }} className="chart-skeleton bg-white mt-4 p-5">
                        <div className="line line-short skeleton"></div>
                        <div className="skeleton chart-skeleton"></div>
                    </div>
                );
            case 'card':
            default:
                return (
                    <div className="gap-4 flex flex-row">
                        {[...Array(count)].map((_, idx) => (
                            <div key={idx} className="card-skeleton" style={{ height: '120px', flex: 1 }}>
                                <div className="p-5">
                                    <div className="line line-long skeleton" />
                                    <div className="line line-short skeleton mt-2" />
                                </div>
                            </div>
                        ))}
                    </div>
                );
        }
    };

    return <div>{renderSkeleton()}</div>;
}
