<script>
  const kopo = [
    [
      [17, 18],
      [15, 16],
    ],
    [
      [23, 24],
      [9, 10],
    ],
    [
      [21, 22],
      [11, 12],
    ],
    [
      [19, 20],
      [13, 14],
    ],
    [
      [18, 17],
      [16, 15],
    ],
    [
      [24, 23],
      [10, 9],
    ],
    [
      [22, 21],
      [12, 11],
    ],
    [
      [20, 19],
      [14, 13],
    ],
  ];
  const ro16 = [
    [[], [1, 2]],
    [[], [7, 8]],
    [[], [5, 6]],
    [[], [3, 4]],
    [[], [2, 1]],
    [[], [8, 7]],
    [[], [6, 5]],
    [[], [4, 3]],
  ];
  let { teams, table } = $props();
</script>

<section class="mb-12 px-3 py-1.5 max-w-full overflow-x-auto">
  <div class="flex">
    <!-- KO Play-offs -->
    <div class="flex flex-col space-y-10">
      <div
        class="m-auto px-3 pt-0.5 bg-blue-600 rounded-xl text-sm whitespace-nowrap"
      >
        KO PLAY-OFFS
      </div>
      {#each Array(8) as _, i}
        {@const team1 = teams.get(table[kopo[i][0][0] - 1])}
        {@const team2 = teams.get(table[kopo[i][0][1] - 1])}
        {@const team3 = teams.get(table[kopo[i][1][0] - 1])}
        {@const team4 = teams.get(table[kopo[i][1][1] - 1])}
        <div class="flex items-center">
          <div class="w-64">
            <div
              class="h-6 justify-between flex bg-blue-900 bg-opacity-35 rounded-tl-full rounded-tr-full"
            ></div>
            <div class="h-16 flex bg-blue-900 bg-opacity-35">
              <div
                class="w-32 flex flex-col items-center border-r border-blue-600 border-opacity-35"
              >
                <div class="h-8 flex">
                  <div
                    class="w-8 flex justify-center items-center font-champions-bold text-xl bg-blue-900"
                  >
                    {kopo[i][0][0]}
                  </div>
                  <div
                    class="w-4 flex justify-center items-center font-champions-light text-3xl text-blue-600 text-opacity-35"
                  >
                    /
                  </div>
                  <div
                    class="w-8 flex justify-center items-center font-champions-bold text-xl bg-blue-900"
                  >
                    {kopo[i][0][1]}
                  </div>
                </div>
                <div class="h-8 flex space-x-4">
                  <div class="w-8 p-1 flex justify-center">
                    <img
                      class="h-full"
                      src="images/teams/{team1.id}.svg"
                      alt={team1.name}
                    />
                  </div>
                  <div class="w-8 p-1 flex justify-center">
                    <img
                      class="h-full"
                      src="images/teams/{team2.id}.svg"
                      alt={team2.name}
                    />
                  </div>
                </div>
              </div>
              <div
                class="w-32 flex flex-col items-center border-l border-blue-600 border-opacity-35"
              >
                <div class="h-8 flex">
                  <div
                    class="w-8 flex justify-center items-center font-champions-bold text-xl bg-blue-800"
                  >
                    {kopo[i][1][0]}
                  </div>
                  <div
                    class="w-4 flex justify-center items-center font-champions-light text-3xl text-blue-600 text-opacity-35"
                  >
                    /
                  </div>
                  <div
                    class="w-8 flex justify-center items-center font-champions-bold text-xl bg-blue-800"
                  >
                    {kopo[i][1][1]}
                  </div>
                </div>
                <div class="h-8 flex space-x-4">
                  <div class="w-8 p-1 flex justify-center">
                    <img
                      class="h-full"
                      src="images/teams/{team3.id}.svg"
                      alt={team3.name}
                    />
                  </div>
                  <div class="w-8 p-1 flex justify-center">
                    <img
                      class="h-full"
                      src="images/teams/{team4.id}.svg"
                      alt={team4.name}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              class="h-6 bg-blue-900 bg-opacity-35 rounded-bl-full rounded-br-full"
            ></div>
          </div>
          <div class="w-10 h-0.5 bg-blue-900"></div>
        </div>
      {/each}
    </div>
    <!-- Round of 16 -->
    <div class="flex flex-col space-y-10">
      <div
        class="m-auto px-3 pt-0.5 bg-blue-900 rounded-xl text-sm whitespace-nowrap"
      >
        ROUND OF 16
      </div>
      {#each Array(8) as _, i}
        {@const team3 = teams.get(table[ro16[i][1][0] - 1])}
        {@const team4 = teams.get(table[ro16[i][1][1] - 1])}
        <div class="flex items-center">
          <div class="w-10 h-0.5 bg-blue-900"></div>
          <div class="w-64">
            <div
              class="h-6 justify-between flex bg-blue-900 bg-opacity-35 rounded-tl-full rounded-tr-full"
            ></div>
            <div class="h-16 flex bg-blue-900 bg-opacity-35">
              <div
                class="w-32 text-center flex items-center border-r border-blue-600 border-opacity-35"
              >
                KO PLAY-OFFS WINNER
              </div>
              <div
                class="w-32 flex flex-col items-center border-l border-blue-600 border-opacity-35"
              >
                <div class="h-8 flex">
                  <div
                    class="w-8 flex justify-center items-center font-champions-bold text-xl bg-cyan-400 text-blue-900"
                  >
                    {ro16[i][1][0]}
                  </div>
                  <div
                    class="w-4 flex justify-center items-center font-champions-light text-3xl text-blue-600 text-opacity-35"
                  >
                    /
                  </div>
                  <div
                    class="w-8 flex justify-center items-center font-champions-bold text-xl bg-cyan-400 text-blue-900"
                  >
                    {ro16[i][1][1]}
                  </div>
                </div>
                <div class="h-8 flex space-x-4">
                  <div class="w-8 p-1 flex justify-center">
                    <img
                      class="h-full"
                      src="images/teams/{team3.id}.svg"
                      alt={team3.name}
                    />
                  </div>
                  <div class="w-8 p-1 flex justify-center">
                    <img
                      class="h-full"
                      src="images/teams/{team4.id}.svg"
                      alt={team4.name}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              class="h-6 bg-blue-900 bg-opacity-35 rounded-bl-full rounded-br-full"
            ></div>
          </div>
          <div class="w-10 h-0.5 bg-blue-900"></div>
        </div>
      {/each}
    </div>
    <!-- Quarter-finals -->
    <div class="flex flex-col space-y-10">
      <div class="px-3 pt-0.5 bg-blue-600 rounded-xl text-sm whitespace-nowrap">
        QUARTER-FINALS
      </div>
      <div class="flex flex-col justify-between h-full py-14">
        {#each Array(4) as _}
          <div class="flex items-center">
            <div class="w-0.5 h-38 bg-blue-900"></div>
            <div class="w-10 h-0.5 bg-blue-900"></div>
            <div class="w-64">
              <div
                class="h-6 bg-blue-900 bg-opacity-35 rounded-tl-full rounded-tr-full"
              ></div>
              <div class="h-16 bg-blue-900 bg-opacity-35 text-center">
                <p>Match</p>
              </div>
              <div
                class="h-6 bg-blue-900 bg-opacity-35 rounded-bl-full rounded-br-full"
              ></div>
            </div>
            <div class="w-10 h-0.5 bg-blue-900"></div>
          </div>
        {/each}
      </div>
    </div>
    <!-- Semi-finals -->
    <div class="flex flex-col space-y-10">
      <div class="px-3 pt-0.5 bg-blue-900 rounded-xl text-sm whitespace-nowrap">
        SEMI-FINALS
      </div>
      <div class="flex flex-col h-full justify-between py-33">
        {#each Array(2) as _}
          <div class="flex items-center">
            <div class="w-0.5 h-76 bg-blue-900"></div>
            <div class="w-10 h-0.5 bg-blue-900"></div>
            <div class="w-64">
              <div
                class="h-6 bg-blue-900 bg-opacity-35 rounded-tl-full rounded-tr-full"
              ></div>
              <div class="h-16 bg-blue-900 bg-opacity-35 text-center">
                <p>Match</p>
              </div>
              <div
                class="h-6 bg-blue-900 bg-opacity-35 rounded-bl-full rounded-br-full"
              ></div>
            </div>
            <div class="w-10 h-0.5 bg-blue-900"></div>
          </div>
        {/each}
      </div>
    </div>
    <!-- Final -->
    <div class="flex flex-col space-y-10">
      <div class="px-3 pt-0.5 bg-blue-600 rounded-xl text-sm whitespace-nowrap">
        FINAL
      </div>
      <div class="flex h-full justify-center">
        <div class="flex items-center">
          <div class="w-0.5 h-152 bg-blue-900"></div>
          <div class="w-10 h-0.5 bg-blue-900"></div>
          <div class="w-64">
            <div
              class="h-6 bg-blue-900 bg-opacity-35 rounded-tl-full rounded-tr-full"
            ></div>
            <div class="h-16 bg-blue-900 bg-opacity-35 text-center">
              <p>Match</p>
            </div>
            <div
              class="h-6 bg-blue-900 bg-opacity-35 rounded-bl-full rounded-br-full"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
