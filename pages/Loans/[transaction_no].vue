<template>
  <div class="h-full md:h-screen">
    <UContainer :ui="{ base: 'pt-10 pb-20' }">
      <UBreadcrumb
        class="mb-8"
        :links="[
          { label: 'Home', to: '/' },
          { label: 'Loans', to: '/loans' },
          { label: `${$route.params?.transaction_no}` },
        ]"
      />

      <UProgress animation="elastic" v-if="loanLoading" class="py-5" />
      <UCard v-else>
        <template #header>
          <h4 class="block uppercase font-bold">Loan Details</h4>
        </template>
        <!-- LOAN DETAILS -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6"
        >
          <!-- Grid Item 1 -->
          <div class="mb-3">
            <span
              class="block uppercase text-xs font-semibold text-gray-400 pb-2"
              >Transaction Number</span
            >
            <p>{{ func_ifEmpty(getLoanData?.transaction_no) }}</p>
          </div>
          <div class="mb-3">
            <span
              class="block uppercase text-xs font-semibold text-gray-400 pb-2"
              >Amount</span
            >
            <p>PHP {{ func_ifEmpty(formatMoney(getLoanData?.amount)) }}</p>
          </div>
          <div class="mb-3">
            <span
              class="block uppercase text-xs font-semibold text-gray-400 pb-2"
              >Percentage</span
            >
            <p>{{ func_ifEmpty(getLoanData?.loan_percentage) }}%</p>
          </div>
          <div class="mb-3">
            <span
              class="block uppercase text-xs font-semibold text-gray-400 pb-2"
              >Interest Amount</span
            >
            <p>
              PHP {{ func_ifEmpty(formatMoney(getLoanData?.interest_amount)) }}
            </p>
          </div>
          <div class="mb-3">
            <span
              class="block uppercase text-xs font-semibold text-gray-400 pb-2"
              >Date</span
            >
            <p>{{ func_ifEmpty(getLoanData?.date) }}</p>
          </div>
          <div class="mb-3">
            <span
              class="block uppercase text-xs font-semibold text-gray-400 pb-2"
              >Status</span
            >
            <p>
              <UBadge
                :color="getLoanData.status === 'Pending' ? 'blue' : 'primary'"
                :label="getLoanData.status"
                variant="subtle"
              />
            </p>
          </div>
        </div>
        <UDivider label="Agent" class="pb-8 pt-10" />
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <!-- Grid Item 1 -->
          <div class="mb-3">
            <span
              class="block uppercase text-xs font-semibold text-gray-400 pb-2"
              >Name</span
            >
            <p>{{ func_ifEmpty(getLoanData?.agent?.name) }}</p>
          </div>
          <div class="mb-3">
            <span
              class="block uppercase text-xs font-semibold text-gray-400 pb-2"
              >Percentage</span
            >
            <p>{{ func_ifEmpty(getLoanData?.agent_percentage) }}%</p>
          </div>
          <div class="mb-3">
            <span
              class="block uppercase text-xs font-semibold text-gray-400 pb-2"
              >Amount</span
            >
            <p>
              PHP
              {{
                formatMoney(
                  func_computeAmount(
                    getLoanData?.interest_amount,
                    getLoanData?.agent_percentage
                  )
                )
              }}
            </p>
          </div>
        </div>
        <UDivider label="Lead Generator" class="pb-8 pt-10" />
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <!-- Grid Item 1 -->
          <div class="mb-3">
            <span
              class="block uppercase text-xs font-semibold text-gray-400 pb-2"
              >Name</span
            >
            <p>{{ func_ifEmpty(getLoanData?.lead_generator?.name) }}</p>
          </div>
          <div class="mb-3">
            <span
              class="block uppercase text-xs font-semibold text-gray-400 pb-2"
              >Percentage</span
            >
            <p>{{ func_ifEmpty(getLoanData?.lead_generator_percentage) }}%</p>
          </div>
          <div class="mb-3">
            <span
              class="block uppercase text-xs font-semibold text-gray-400 pb-2"
              >Amount</span
            >
            <p>
              PHP
              {{
                formatMoney(
                  func_computeAmount(
                    getLoanData?.interest_amount,
                    getLoanData?.lead_generator_percentage
                  )
                )
              }}
            </p>
          </div>
        </div>
        <UDivider class="pb-8 pt-10" />
        <div class="flex justify-between w-full">
          <!-- Grid Item 1 -->
          <div class="mb-3">
            <h2>Total Interest Amount:</h2>
          </div>
          <div class="mb-3">
            <h2 class="text-xl font-semibold text-green-500">
              PHP
              {{
                func_computeTotalInterestAmount(
                  func_computeAmount(
                    getLoanData?.interest_amount,
                    getLoanData?.agent_percentage
                  ),
                  func_computeAmount(
                    getLoanData?.interest_amount,
                    getLoanData?.lead_generator_percentage
                  ),
                  getLoanData?.interest_amount
                )
              }}
            </h2>
          </div>
        </div>
      </UCard>
      <div class="text-right my-5">
        <UButton to="/loans" label="Back" color="gray" variant="solid" />
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const $route = useRoute();

// Store
const loanStore = useLoanStore();
const { loanLoading, getLoanData } = storeToRefs(loanStore);

onMounted(() => {
  loanStore.fetchLoanData($route.params?.transaction_no as string);
});

const func_ifEmpty = (value: any) => {
  return value ?? "--";
};

const func_computeAmount = (interest: number, percentage: number): number => {
  const interestNum = Number(interest);
  const percentageNum = Number(percentage);

  return interestNum * percentageNum;
};

const func_computeTotalInterestAmount = (
  agentInterest: number,
  leadGenInterest: number,
  initialInterestAmount: number
) => {
  const interest = agentInterest + leadGenInterest;
  return formatMoney(initialInterestAmount - interest);
};
</script>
